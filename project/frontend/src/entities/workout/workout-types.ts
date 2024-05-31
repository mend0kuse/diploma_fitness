import { TUser } from '@/entities/user';
import { TOrder } from '../order/order-types';
import { EnumToUnion } from '@/shared/lib/typescript/EnumToUnion';

export type TWorkout = {
    trainer: TUser;
    participants: TUser[];
    orders: TOrder[];
    id: number;
    trainerId: number;
    title: string;
    status: 'pending' | 'completed';
    description: string;
    sportType: TWorkoutType;
    maxPlaces: number;
    dateStart: Date;
    durationMinutes: number;
};

export type TWorkoutInput = {
    title: string;
    description: string;
    sportType: TWorkoutType;
    dateStart: Date;
    durationMinutes: number;
    maxPlaces: number;
    trainerId: number | null;
};

export const WORKOUT_TYPE = {
    YOGA: 'Йога',
    PILATES: 'Пилатес',
    FITNESS: 'Фитнес',
    BOX: 'Бокс',
} as const;

export type TWorkoutType = EnumToUnion<typeof WORKOUT_TYPE>;
