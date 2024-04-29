import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { PrismaService } from '../prisma/prisma.service';
import { OrderService } from '../order/order.service';

@Module({
    controllers: [WorkoutController],
    providers: [WorkoutService, PrismaService, OrderService],
})
export class WorkoutModule {}
