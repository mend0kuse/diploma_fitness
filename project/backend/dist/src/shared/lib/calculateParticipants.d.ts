import { Workout, WorkoutOrder, User } from '@prisma/client';
export declare const calculateParticipants: (workout: Workout & {
    orders: (WorkoutOrder & {
        client?: User;
    })[];
}) => {
    participants: {
        id: number;
        email: string;
        role: string;
        password: string;
    }[];
    id: number;
    trainerId: number;
    title: string;
    description: string;
    sportType: string;
    status: string;
    maxPlaces: number;
    dateStart: Date;
    durationMinutes: number;
    orders: (WorkoutOrder & {
        client?: User;
    })[];
};
