import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JWT } from './constans';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) {}

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        const partialAuth = this.reflector.get('partialAuth', context.getHandler());

        if (!token && !partialAuth) {
            throw new UnauthorizedException();
        }

        try {
            request.user = await this.jwtService.verifyAsync(token ?? '', {
                secret: JWT.SECRET,
            });
        } catch {
            if (!partialAuth) {
                throw new UnauthorizedException();
            }
        }

        return true;
    }
}
