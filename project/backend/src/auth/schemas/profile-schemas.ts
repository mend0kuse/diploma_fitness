import { z } from 'zod';

export const signUpDto = z
    .object({
        email: z.string().email({ message: 'Невалидная почта' }),
        password: z.string().min(7, { message: 'Пароль должен содержать минимум 7 символов' }),
    })
    .required();

export type SignUpDto = z.infer<typeof signUpDto>;

export type SignInDto = SignUpDto;
