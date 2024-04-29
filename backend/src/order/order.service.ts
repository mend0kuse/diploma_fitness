import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WorkoutOrder } from '@prisma/client';
import { ORDER_STATUS } from './order';
import { WorkoutService } from '../workout/workout.service';

@Injectable()
export class OrderService {
    constructor(
        private prismaService: PrismaService,
        private workoutService: WorkoutService
    ) {}

    async createOrder(order: Omit<WorkoutOrder, 'id' | 'status'>) {
        const created = await this.prismaService.workoutOrder.create({
            data: {
                ...order,
                status: ORDER_STATUS.PENDING,
            },
        });

        await this.workoutService.decrementAvailablePlaceByWorkoutId(created.workoutId);

        return created;
    }

    async getOrders() {
        return this.prismaService.workoutOrder.findMany();
    }

    async getOrdersById(id: number) {
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
        const edited = await this.editOrder(id, { status: ORDER_STATUS.CANCELLED });

        await this.workoutService.incrementAvailablePlaceByWorkoutId(edited.workoutId);

        return edited;
    }

    async completeByWorkout(workoutId: number) {
        return this.prismaService.workoutOrder.updateMany({
            where: { workoutId },
            data: {
                status: ORDER_STATUS.COMPLETED,
            },
        });
    }
}
