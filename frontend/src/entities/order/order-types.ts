import { TUser } from '@/entities/user';
import { TWorkout } from '@/entities/workout/workout-types';
import { EnumToUnion } from '@/shared/lib/typescript/EnumToUnion';

export type TOrder = {
    client: TUser;
    workout: TWorkout;
    id: number;
    status: TOrderStatus;
};

export const ORDER_STATUS = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
} as const;

export type TOrderStatus = EnumToUnion<typeof ORDER_STATUS>;
