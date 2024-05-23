import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Workout } from '@prisma/client';
import { TWorkoutQuery } from './workout';
import { calculateParticipants } from 'src/shared/lib/calculateParticipants';

@Injectable()
export class WorkoutService {
    constructor(private prismaService: PrismaService) {}

    private include = {
        trainer: {
            include: {
                profile: true,
                myReviews: true,
            },
        },
        orders: {
            include: {
                client: {
                    include: {
                        profile: true,
                    },
                },
            },
        },
    };

    createWorkout(data: Workout, trainerId: number) {
        return this.prismaService.workout.create({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            data: {
                ...data,
                status: 'pending',
                trainer: {
                    connect: {
                        id: trainerId,
                    },
                },
            },
            include: this.include,
        });
    }

    async getWorkouts(query: TWorkoutQuery = {}) {
        const args = this.generateFindArguments(query);

        const workouts = await this.prismaService.workout.findMany({
            ...args,
            include: this.include,
        });

        const result = workouts.map((item) => calculateParticipants(item));

        if (!query.hasAvailablePlaces) {
            return result;
        }

        return result?.filter((item) => item.participants.length !== item.maxPlaces);
    }

    async getWorkoutById(id: number) {
        const found = await this.prismaService.workout.findFirst({
            where: { id },
            include: {
                trainer: {
                    include: {
                        profile: true,
                    },
                },
                orders: {
                    include: {
                        client: {
                            include: {
                                profile: true,
                            },
                        },
                    },
                },
            },
        });

        return calculateParticipants(found);
    }

    deleteWorkout(id: number) {
        return this.prismaService.workout.delete({
            where: { id },
        });
    }

    editWorkout(args: Prisma.WorkoutUpdateArgs) {
        return this.prismaService.workout.update({ ...args, include: this.include });
    }

    private generateFindArguments({
        sort,
        dateStart,
        type,
        limit,
        order,
        page,
        dateEnd,
        trainerId,
        userId,
    }: TWorkoutQuery): Prisma.WorkoutFindManyArgs {
        return {
            where: {
                ...(userId && {
                    participants: { some: { userId: Number(userId) } },
                }),
                ...(type && { sportType: { equals: type } }),
                ...(trainerId && {
                    trainerId: { equals: Number(trainerId) },
                }),
                ...(dateStart && {
                    AND: [{ dateStart: { gte: new Date(dateStart) } }, { dateStart: { lte: new Date(dateEnd) } }],
                }),
            },
            ...(sort && { orderBy: { [sort]: order ?? 'asc' } }),
            ...(limit && { take: limit }),
            ...(limit && page && { take: limit, skip: (page - 1) * limit }),
        };
    }
}
