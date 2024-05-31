import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignInDto, SignUpDto } from './schemas/profile-schemas';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    signIn(dto: SignInDto): Promise<{
        access_token: string;
    }>;
    signUp(user: SignUpDto): Promise<Omit<{
        id: number;
        email: string;
        role: string;
        password: string;
    }, "password">>;
}
