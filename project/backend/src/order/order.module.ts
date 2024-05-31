import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from '../prisma/prisma.service';
import { WorkoutService } from '../workout/workout.service';

@Module({
    controllers: [OrderController],
    providers: [OrderService, PrismaService, WorkoutService],
})
export class OrderModule {}
