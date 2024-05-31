import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Workout } from '@prisma/client';
import { TWorkoutQuery } from './workout';
export declare class WorkoutService {
    private prismaService;
    constructor(prismaService: PrismaService);
    private include;
    createWorkout({ trainerId, ...data }: Workout): Prisma.Prisma__WorkoutClient<{
        id: number;
        trainerId: number;
        title: string;
        description: string;
        sportType: string;
        status: string;
        maxPlaces: number;
        dateStart: Date;
        durationMinutes: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getWorkouts(query?: TWorkoutQuery): Promise<{
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
        orders: ({
            id: number;
            clientId: number;
            status: string;
            workoutId: number;
        } & {
            client?: {
                id: number;
                email: string;
                role: string;
                password: string;
            };
        })[];
    }[]>;
    getWorkoutById(id: number): Promise<{
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
        orders: ({
            id: number;
            clientId: number;
            status: string;
            workoutId: number;
        } & {
            client?: {
                id: number;
                email: string;
                role: string;
                password: string;
            };
        })[];
    }>;
    deleteWorkout(id: number): Prisma.Prisma__WorkoutClient<{
        id: number;
        trainerId: number;
        title: string;
        description: string;
        sportType: string;
        status: string;
        maxPlaces: number;
        dateStart: Date;
        durationMinutes: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    editWorkout(args: Prisma.WorkoutUpdateArgs): Prisma.Prisma__WorkoutClient<{
        id: number;
        orders: ({
            id: number;
            clientId: number;
            status: string;
            workoutId: number;
        } | ({
            id: number;
            status: string;
            workout: {
                id: number;
                trainerId: number;
                title: string;
                description: string;
                sportType: string;
                status: string;
                maxPlaces: number;
                dateStart: Date;
                durationMinutes: number;
            };
            clientId: number;
            workoutId: number;
            client: {
                id: number;
                email: string;
                role: string;
                password: string;
            } | ({
                id: number;
                email: string;
                role: string;
                password: string;
                profile: {
                    id: number;
                    userId: number;
                    name: string;
                    status: string;
                    avatar: string;
                };
                chatMessages: {
                    id: number;
                    createdAt: Date;
                    message: string;
                    userId: number;
                    chatId: number;
                }[];
                chats: {
                    userId: number;
                    chatId: number;
                }[];
                trainerWorkouts: {
                    id: number;
                    trainerId: number;
                    title: string;
                    description: string;
                    sportType: string;
                    status: string;
                    maxPlaces: number;
                    dateStart: Date;
                    durationMinutes: number;
                }[];
                orders: {
                    id: number;
                    clientId: number;
                    status: string;
                    workoutId: number;
                }[];
                payments: {
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
                    freezeEndDate: Date;
                    userId: number;
                }[];
                myReviews: {
                    id: number;
                    rating: number;
                    text: string;
                    isHiddenUser: boolean;
                    userId: number;
                    authorId: number;
                }[];
                leavedReviews: {
                    id: number;
                    rating: number;
                    text: string;
                    isHiddenUser: boolean;
                    userId: number;
                    authorId: number;
                }[];
                _count: {
                    profile: number;
                    chatMessages: number;
                    chats: number;
                    trainerWorkouts: number;
                    orders: number;
                    payments: number;
                    myReviews: number;
                    leavedReviews: number;
                };
            } & {
                id: number;
                email: string;
                role: string;
                password: string;
            });
        } & {
            id: number;
            clientId: number;
            status: string;
            workoutId: number;
        }))[];
        _count: {
            trainer: number;
            orders: number;
        };
        status: string;
        trainer: {
            id: number;
            email: string;
            role: string;
            password: string;
        } | ({
            id: number;
            email: string;
            role: string;
            password: string;
            profile: {
                id: number;
                userId: number;
                name: string;
                status: string;
                avatar: string;
            };
            chatMessages: {
                id: number;
                createdAt: Date;
                message: string;
                userId: number;
                chatId: number;
            }[];
            chats: {
                userId: number;
                chatId: number;
            }[];
            trainerWorkouts: {
                id: number;
                trainerId: number;
                title: string;
                description: string;
                sportType: string;
                status: string;
                maxPlaces: number;
                dateStart: Date;
                durationMinutes: number;
            }[];
            orders: {
                id: number;
                clientId: number;
                status: string;
                workoutId: number;
            }[];
            payments: {
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
                freezeEndDate: Date;
                userId: number;
            }[];
            myReviews: {
                id: number;
                rating: number;
                text: string;
                isHiddenUser: boolean;
                userId: number;
                authorId: number;
            }[];
            leavedReviews: {
                id: number;
                rating: number;
                text: string;
                isHiddenUser: boolean;
                userId: number;
                authorId: number;
            }[];
            _count: {
                profile: number;
                chatMessages: number;
                chats: number;
                trainerWorkouts: number;
                orders: number;
                payments: number;
                myReviews: number;
                leavedReviews: number;
            };
        } & {
            id: number;
            email: string;
            role: string;
            password: string;
        });
        trainerId: number;
        title: string;
        description: string;
        sportType: string;
        maxPlaces: number;
        dateStart: Date;
        durationMinutes: number;
    } & {
        id: number;
        trainerId: number;
        title: string;
        description: string;
        sportType: string;
        status: string;
        maxPlaces: number;
        dateStart: Date;
        durationMinutes: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    private generateFindArguments;
}
