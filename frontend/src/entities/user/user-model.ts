import { EnumToUnion } from '@/shared/lib/typescript/EnumToUnion';
import { makeAutoObservable } from 'mobx';
import { LOCAL_STORAGE_TOKEN } from '@/entities/user/user-config';

export type TUser = {
    id: number;
    email: string;
    role: TUserRole;
    profile: TProfile;
};

export type TProfile = {
    name: string;
    age: string; // TODO: birth
    avatar: string;
};

export type UserInput = { password: string; email: string };
export type ProfileInput = { age?: string; name?: string; avatar?: File | null };

export const USER_ROLE = {
    USER: 'user',
    MANAGER: 'manager',
} as const;

export type TUserRole = EnumToUnion<typeof USER_ROLE>;

export class User {
    private data: TUser | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(data: TUser | null) {
        this.data = data;
    }

    get isManager() {
        return this.data?.role === 'manager';
    }

    get isAuthorized() {
        return !!this.data;
    }

    get avatar() {
        return this.data?.profile?.avatar;
    }

    get role() {
        return this.data?.role;
    }

    get email() {
        return this.data?.email;
    }

    get name() {
        return this.data?.profile?.name;
    }

    get id() {
        return this.data?.id;
    }

    logout() {
        this.setUser(null);
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    }
}

export const user = new User();
