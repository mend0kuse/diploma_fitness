import { TUser } from '@/entities/user/user-model';
import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token: string) => {
    const result = jwtDecode(token);

    if (!isUser(result)) {
        return null;
    }

    return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isUser = (data: any): data is TUser => {
    return data.profile !== undefined;
};
