import { EnumToUnion } from '@/shared/lib/typescript/EnumToUnion';
import { TUser } from '../user';

export type TPayment = {
    id: string;
    order_id: string;
    ticketId: number;

    status: TPaymentStatus;
    paid: boolean;
    description: string;
    value: string;
    currency: string;

    createdAt: Date;
    expiresAt: Date;

    user: TUser;
    userId: number;

    confirmation: string;
};

const PAYMENT_STATUS = {
    PENDING: 'pending',
    CANCELED: 'canceled',
    SUCCEED: 'succeed',
} as const;

export type TPaymentStatus = EnumToUnion<typeof PAYMENT_STATUS>;
