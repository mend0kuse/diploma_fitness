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
    description: string;
    sportType: TWorkoutType;
    maxPlaces: number;
    availablePlaces: number;
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
};

export const WORKOUT_TYPE = {
    RUNNING: 'Бег',
    CYCLING: 'Вело',
    SWIMMING: 'Плаванье',
    WALKING: 'Ходьба',
} as const;

export type TWorkoutType = EnumToUnion<typeof WORKOUT_TYPE>;
