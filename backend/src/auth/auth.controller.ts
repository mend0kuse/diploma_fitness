import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, signUpDto, SignUpDto } from './schemas/profile-schemas';
import { ZodValidationPipe } from '../shared/validation/zod-validation.pipe';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signin')
    @UsePipes(new ZodValidationPipe(signUpDto))
    signIn(@Body() dto: SignInDto) {
        return this.authService.signIn(dto);
    }

    @Post('signup')
    @UsePipes(new ZodValidationPipe(signUpDto))
    signup(@Body() dto: SignUpDto) {
        return this.authService.signUp(dto);
    }
}
