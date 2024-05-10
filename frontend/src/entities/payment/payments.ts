import { TUser } from '../user';

export type TPayment = {
    id: string;
    order_id: string;
    ticketId: number;

    status: string;
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
