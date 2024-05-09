import { EnumToUnion } from '@/shared/lib/typescript/EnumToUnion';
import { makeAutoObservable } from 'mobx';
import { LOCAL_STORAGE_TOKEN } from '@/entities/user/user-config';
import { TOrder } from '../order/order-types';
import { TChat } from '../chat/chat-model';
import { TReview } from '../review/review-types';

export type TUser = {
    id: number;
    email: string;
    role: TUserRole;
    profile: TProfile;
    orders: TOrder[];
    chats: TChat[];
    myReviews: TReview[];
    leavedReviews: TReview[];
};

export type TProfile = {
    name: string;
    status: string;
    avatar: string;
};

export type UserInput = { password: string; email: string };
export type ProfileInput = { status?: string; name?: string; avatar?: File | null };

export const USER_ROLE = {
    USER: 'user',
    TRAINER: 'trainer',
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

    get isTrainer() {
        return this.data?.role === USER_ROLE.TRAINER;
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
