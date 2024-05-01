import { AxiosError } from 'axios';
import { assertIsType } from '@/shared/lib/typescript/isPropertyExist';

export const transformAxiosError = (error: AxiosError) => {
    if (error.message) {
        return error.message;
    }

    if (!error.response) {
        return 'Неизвестная ошибка';
    }

    const data = error.response.data;

    if (assertIsType<{ message: string }>(data, 'message')) {
        return data.message;
    }

    return 'Неизвестная ошибка';
};
