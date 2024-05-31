import { PrismaService } from '../prisma/prisma.service';
import { WorkoutOrder } from '@prisma/client';
export declare class OrderService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createOrder(order: Omit<WorkoutOrder, 'id' | 'status'>): import(".prisma/client").Prisma.Prisma__WorkoutOrderClient<{
        id: number;
        clientId: number;
        status: string;
        workoutId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getUserOrderByWorkoutId(userId: number, workoutId: number): import(".prisma/client").Prisma.Prisma__WorkoutOrderClient<{
        id: number;
        clientId: number;
        status: string;
        workoutId: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    getOrders(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        clientId: number;
        status: string;
        workoutId: number;
    }[]>;
    getOrderById(id: number): import(".prisma/client").Prisma.Prisma__WorkoutOrderClient<{
        id: number;
        clientId: number;
        status: string;
        workoutId: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    getOrdersByUserId(userId: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        clientId: number;
        status: string;
        workoutId: number;
    }[]>;
    editOrder(id: number, order: Partial<WorkoutOrder>): import(".prisma/client").Prisma.Prisma__WorkoutOrderClient<{
        id: number;
        clientId: number;
        status: string;
        workoutId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    cancelOrder(id: number): import(".prisma/client").Prisma.Prisma__WorkoutOrderClient<{
        id: number;
        clientId: number;
        status: string;
        workoutId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    completeByWorkout(workoutId: number, userIds: number[]): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
