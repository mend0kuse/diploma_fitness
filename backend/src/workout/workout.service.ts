import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Workout } from '@prisma/client';
import { OrderService } from '../order/order.service';

@Injectable()
export class WorkoutService {
    constructor(
        private prismaService: PrismaService,
        private orderService: OrderService
    ) {}

    async createWorkout(data: Workout) {
        return this.prismaService.workout.create({
            data,
        });
    }

    async getWorkouts() {
        return this.prismaService.workout.findMany();
    }

    async getWorkoutById(id: number) {
        return this.prismaService.workout.findUnique({
            where: { id },
        });
    }

    async getWorkoutsByUserId(id: number) {
        return this.prismaService.workout.findMany({
            where: { participants: { some: { userId: id } } },
        });
    }

    async deleteWorkout(id: number) {
        return this.prismaService.workout.delete({
            where: { id },
        });
    }

    async editWorkout(id: number, workout: Workout) {
        return this.prismaService.workout.update({
            where: { id },
            data: workout,
        });
    }

    async completeWorkout(id: number) {
        return this.orderService.completeByWorkout(id);
    }
}
