import { OrderService } from './order.service';
import { RequestWithUser } from '../user/user';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getOrders(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        clientId: number;
        status: string;
        workoutId: number;
    }[]>;
    getOrdersByUserId(id: number): import(".prisma/client").Prisma.PrismaPromise<{
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
    createOrderByWorkoutId(workoutId: number, { user }: RequestWithUser): Promise<{
        id: number;
        clientId: number;
        status: string;
        workoutId: number;
    }>;
    cancelOrder(id: number): import(".prisma/client").Prisma.Prisma__WorkoutOrderClient<{
        id: number;
        clientId: number;
        status: string;
        workoutId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
