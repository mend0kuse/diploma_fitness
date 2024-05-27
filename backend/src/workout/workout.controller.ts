import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { Workout } from '@prisma/client';
import { TWorkoutQuery } from './workout';
import { OrderService } from '../order/order.service';
import { AuthGuard } from '../auth/auth.guard';
import { RequestWithUser } from '../user/user';

@Controller('workout')
export class WorkoutController {
    constructor(
        private readonly workoutService: WorkoutService,
        private readonly orderService: OrderService
    ) {}

    @Get('')
    getWorkouts(@Query() query: TWorkoutQuery) {
        return this.workoutService.getWorkouts(query);
    }

    @Get(':id')
    getWorkoutById(@Param('id') id: number) {
        return this.workoutService.getWorkoutById(Number(id));
    }

    @Post('')
    createWorkout(@Body() dto: Workout) {
        return this.workoutService.createWorkout(dto);
    }

    @Put('complete/:id')
    async completeWorkout(
        @Param('id', ParseIntPipe) id: number,
        @Body() { visitedUserIds }: { visitedUserIds: number[] }
    ) {
        await this.orderService.completeByWorkout(id, visitedUserIds);
        return this.workoutService.editWorkout({ where: { id }, data: { status: 'completed' } });
    }

    @Delete(':id')
    deleteWorkout(@Param('id') id: number) {
        return this.workoutService.deleteWorkout(id);
    }

    @Put(':id')
    editWorkout(@Param('id') id: number, @Body() dto: Workout) {
        return this.workoutService.editWorkout({ where: { id }, data: dto });
    }
}
