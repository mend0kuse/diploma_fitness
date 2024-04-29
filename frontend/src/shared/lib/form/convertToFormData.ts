import { isArray, isObject } from 'lodash';

export const convertToFormData = <T extends Record<string, any>>(obj: T, fileKey?: keyof T) => {
    const formData = new FormData();

    for (const key in obj) {
        const value = obj[key];

        if (isArray(value)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            value.forEach((el) => formData.append(key, el));
            continue;
        }

        if (isObject(value) && key !== fileKey) {
            for (const key2 in value) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                formData.append(key2, value[key2]);
            }
            continue;
        }

        formData.append(key, value);
    }

    return formData;
};
