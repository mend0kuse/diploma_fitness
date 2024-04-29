import { AxiosError } from 'axios';
import { assertIsType } from '@/shared/lib/typescript/isPropertyExist';

export const transformAxiosError = (error: AxiosError) => {
    if (!error.response) {
        return '';
    }

    const data = error.response.data;

    if (assertIsType<{ message: string }>(data, 'message')) {
        return data.message;
    }

    return '';
};
