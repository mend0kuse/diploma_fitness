import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './schemas/profile-schemas';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(dto: SignInDto): Promise<{
        access_token: string;
    }>;
    signup(dto: SignUpDto): Promise<Omit<{
        id: number;
        email: string;
        role: string;
        password: string;
    }, "password">>;
}
