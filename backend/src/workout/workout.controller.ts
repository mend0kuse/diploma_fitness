import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { Workout } from '@prisma/client';
import { TWorkoutQuery } from './workout';
import _ from 'lodash';
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
    async getWorkouts(@Query() query: TWorkoutQuery) {
        const result = await this.workoutService.getWorkouts(query);

        return _.groupBy(result, (workout) => {
            return workout.dateStart.toISOString().slice(0, 10);
        });
    }

    @Get(':id')
    async getWorkoutById(@Param('id') id: number) {
        return this.workoutService.getWorkoutById(id);
    }

    @Post('')
    @UseGuards(AuthGuard)
    async createWorkout(@Req() { user }: RequestWithUser, @Body() dto: Workout) {
        return this.workoutService.createWorkout(dto, user.id);
    }

    @Delete(':id')
    async deleteWorkout(@Param('id') id: number) {
        return this.workoutService.deleteWorkout(id);
    }

    @Put('complete/:id')
    async completeWorkout(@Param('id') id: number) {
        return this.orderService.completeByWorkout(id);
    }

    @Put(':id')
    async editWorkout(@Param('id') id: number, @Body() dto: Workout) {
        return this.workoutService.editWorkout(id, dto);
    }
}
