import { TUser } from '@/entities/user';
import { TWorkout } from '@/entities/workout/workout-types';
import { EnumToUnion } from '@/shared/lib/typescript/EnumToUnion';

export type TOrder = {
    client: TUser;
    clientId: number;
    workout: TWorkout;
    workoutId: number;
    id: number;
    status: TOrderStatus;
};

export const ORDER_STATUS = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
    MISSING: 'MISSING',
    CANCELED_BY_ADMIN: 'CANCELED_BY_ADMIN',
} as const;

export const ORDER_STATUS_TEXT: Record<TOrderStatus, string> = {
    PENDING: 'Ожидание',
    MISSING: 'Пропущено',
    COMPLETED: 'Проведено',
    CANCELLED: 'Отменено',
    CANCELED_BY_ADMIN: 'Тренировка отменена',
} as const;

export const ORDER_STATUS_COLOR: Record<TOrderStatus, string> = {
    PENDING: 'gray',
    COMPLETED: 'green',
    CANCELLED: 'red',
    CANCELED_BY_ADMIN: 'red',
    MISSING: 'red',
} as const;

export type TOrderStatus = EnumToUnion<typeof ORDER_STATUS>;
