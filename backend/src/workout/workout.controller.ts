import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { Workout } from '@prisma/client';

@Controller('workout')
export class WorkoutController {
    constructor(private readonly workoutService: WorkoutService) {}

    @Get('')
    async getWorkouts() {
        return this.workoutService.getWorkouts();
    }

    @Get('user/:id')
    async getWorkoutsUserById(@Param('id') id: number) {
        return this.workoutService.getWorkoutsByUserId(id);
    }

    @Get(':id')
    async getWorkoutById(@Param('id') id: number) {
        return this.workoutService.getWorkoutById(id);
    }

    @Post('')
    async createWorkout(@Body() dto: Workout) {
        return this.workoutService.createWorkout(dto);
    }

    @Delete(':id')
    async deleteWorkout(@Param('id') id: number) {
        return this.workoutService.deleteWorkout(id);
    }

    @Put('complete/:id')
    async completeWorkout(@Param('id') id: number) {
        return this.workoutService.completeWorkout(id);
    }

    @Put(':id')
    async editWorkout(@Param('id') id: number, @Body() dto: Workout) {
        return this.workoutService.editWorkout(id, dto);
    }
}
