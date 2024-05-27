import { EnumToUnion } from '@/shared/lib/typescript/EnumToUnion';
import { makeAutoObservable } from 'mobx';
import { LOCAL_STORAGE_TOKEN } from '@/entities/user/user-config';
import { TOrder } from '../order/order-types';
import { TChat } from '../chat/chat-model';
import { TReview } from '../review/review-types';
import { TPayment } from '../payment/payments';
import _ from 'lodash';
import { TWorkout } from '../workout/workout-types';

export type TUser = {
    id: number;
    email: string;
    role: TUserRole;
    profile: TProfile;
    orders: TOrder[];
    trainerWorkouts: TWorkout[];
    chats: TChat[];
    myReviews: TReview[];
    leavedReviews: TReview[];
    payments: TPayment[];
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

    get isClient() {
        return this.data?.role === USER_ROLE.USER;
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

    get hasAccessToTraining() {
        if (this.frozenPayment) {
            return false;
        }

        return !!this.actualPayment;
    }

    get frozenPayment() {
        return this.data?.payments?.find((payment) => new Date(payment.freezeEndDate) > new Date());
    }

    get actualPayment() {
        return this.data?.payments?.find((payment) => new Date(payment.expiresAt) > new Date());
    }

    get expiredTicketDate() {
        return _.maxBy(this.data?.payments, (payment) => payment.expiresAt)?.expiresAt;
    }

    logout() {
        this.setUser(null);
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    }
}

export const user = new User();
