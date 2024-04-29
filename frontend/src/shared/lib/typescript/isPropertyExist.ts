import { isObject, isString } from 'lodash';

export const assertIsType = <T>(data: unknown, key: keyof T): data is T => {
    const anyData = data as any;
    const isA = isObject(data) && key in anyData && isString(anyData[key]);

    if (!isA) throw new Error('assertion error');

    return isA;
};
