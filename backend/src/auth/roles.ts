import { OneOfProperty } from '../shared/typescript/OneOfProperty';

export const USER_ROLE = {
    USER: 'user',
    TRAINER: 'manager',
} as const;

export type TUserRole = OneOfProperty<typeof USER_ROLE>;
