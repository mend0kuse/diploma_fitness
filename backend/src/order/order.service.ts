import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WorkoutOrder } from '@prisma/client';
import { ORDER_STATUS } from './order';

@Injectable()
export class OrderService {
    constructor(private prismaService: PrismaService) {}

    async createOrder(order: Omit<WorkoutOrder, 'id' | 'status'>) {
        return this.prismaService.workoutOrder.create({
            data: {
                ...order,
                status: ORDER_STATUS.PENDING,
            },
        });
    }

    async getOrders() {
        return this.prismaService.workoutOrder.findMany();
    }

    async getOrderById(id: number) {
        return this.prismaService.workoutOrder.findUnique({
            where: { id },
        });
    }

    async getOrdersByUserId(userId: number) {
        return this.prismaService.workoutOrder.findMany({
            where: { clientId: userId },
        });
    }

    async editOrder(id: number, order: Partial<WorkoutOrder>) {
        return this.prismaService.workoutOrder.update({
            where: { id },
            data: order,
        });
    }

    async cancelOrder(id: number) {
        return this.editOrder(id, { status: ORDER_STATUS.CANCELLED });
    }

    async completeByWorkout(workoutId: number, userIds: number[]) {
        await this.prismaService.workoutOrder.updateMany({
            where: { AND: [{ workoutId }, { clientId: { in: userIds } }] },
            data: {
                status: ORDER_STATUS.COMPLETED,
            },
        });

        return this.prismaService.workoutOrder.updateMany({
            where: { AND: [{ workoutId }, { clientId: { notIn: userIds } }] },
            data: {
                status: ORDER_STATUS.MISSING,
            },
        });
    }
}
