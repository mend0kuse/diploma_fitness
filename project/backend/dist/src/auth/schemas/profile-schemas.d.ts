import { z } from 'zod';
export declare const signUpDto: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
    password?: string;
}, {
    email?: string;
    password?: string;
}>;
export type SignUpDto = z.infer<typeof signUpDto>;
export type SignInDto = SignUpDto;
