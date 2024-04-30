import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Workout } from '@prisma/client';
import { TWorkoutQuery } from './workout';

@Injectable()
export class WorkoutService {
    constructor(private prismaService: PrismaService) {}

    async createWorkout(data: Workout) {
        return this.prismaService.workout.create({
            data,
        });
    }

    async getWorkouts(query: TWorkoutQuery = {}) {
        const args = this.generateFindArguments(query);

        return this.prismaService.workout.findMany(args);
    }

    async getWorkoutById(id: number) {
        return this.prismaService.workout.findUnique({
            where: { id },
        });
    }

    async incrementAvailablePlaceByWorkoutId(id: number) {
        return this.prismaService.workout.update({
            where: { id },
            data: {
                availablePlaces: {
                    increment: 1,
                },
            },
        });
    }

    async decrementAvailablePlaceByWorkoutId(id: number) {
        return this.prismaService.workout.update({
            where: { id },
            data: {
                availablePlaces: {
                    increment: 1,
                },
            },
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

    private generateFindArguments({
        sort,
        dateStart,
        dateEnd,
        type,
        maxParticipants,
        limit,
        order,
        page,
        hasAvailablePlaces,
        trainerId,
        userId,
    }: TWorkoutQuery): Prisma.WorkoutFindManyArgs {
        return {
            where: {
                ...(userId && {
                    participants: { some: { userId } },
                }),
                ...(type && { sportType: { equals: type } }),
                ...(trainerId && {
                    trainerId: { equals: trainerId },
                }),
                ...(hasAvailablePlaces && {
                    availablePlaces: {
                        gt: 0,
                    },
                }),
                ...(maxParticipants && {
                    maxPlaces: { gte: maxParticipants },
                }),
                ...(dateStart && {
                    dateStart: {
                        gte: dateStart,
                    },
                }),
                ...(dateEnd && {
                    dateEnd: {
                        lte: dateEnd,
                    },
                }),
            },
            ...(sort && { orderBy: { [sort]: order ?? 'asc' } }),
            ...(limit && { take: limit }),
            ...(limit && page && { take: limit, skip: (page - 1) * limit }),
        };
    }
}