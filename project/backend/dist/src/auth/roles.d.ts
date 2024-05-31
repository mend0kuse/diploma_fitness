import { OneOfProperty } from '../shared/typescript/OneOfProperty';
export declare const USER_ROLE: {
    readonly USER: "user";
    readonly TRAINER: "trainer";
    readonly ADMIN: "admin";
};
export type TUserRole = OneOfProperty<typeof USER_ROLE>;
