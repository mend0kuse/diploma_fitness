import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { excludeFields } from 'src/shared/lib/excludeFields';
import { UserService } from 'src/user/user.service';
import { JWT } from './constans';
import { SignInDto, SignUpDto } from './schemas/profile-schemas';
import { USER_ROLE } from './roles';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(dto: SignInDto) {
        const user = await this.usersService.getOne({ email: dto.email });

        if (!user) {
            throw new UnauthorizedException('Неправильная почта');
        }

        const isMatch = await bcrypt.compare(dto.password, user?.password);

        if (!isMatch) {
            throw new UnauthorizedException('Неправильный пароль');
        }

        return {
            access_token: await this.jwtService.signAsync(excludeFields(user, ['password'])),
        };
    }

    async signUp(user: SignUpDto) {
        const hashed = await bcrypt.hash(user.password, JWT.SALT_OR_ROUNDS);

        return this.usersService.createUser({
            email: user.email,
            role: USER_ROLE.ADMIN,
            password: hashed,
        });
    }
}
