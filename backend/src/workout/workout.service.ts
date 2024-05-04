import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User, Workout, WorkoutOrder } from '@prisma/client';
import { TWorkoutQuery } from './workout';
import { ORDER_STATUS } from '../order/order';

@Injectable()
export class WorkoutService {
    constructor(private prismaService: PrismaService) {}

    private include: {
        trainer: {
            include: {
                profile: true;
            };
        };
        orders: {
            include: {
                client: {
                    include: {
                        profile: true;
                    };
                };
            };
        };
    };

    createWorkout(data: Workout, trainerId: number) {
        return this.prismaService.workout.create({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            data: {
                ...data,
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

        const result = await this.prismaService.workout.findMany({
            ...args,
            include: this.include,
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return result.map((item) => this.calculateParticipants(item));
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

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.calculateParticipants(found);
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
        durationMinutes,
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
                // TODO:
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
                ...(durationMinutes && {
                    durationMinutes: {
                        lte: durationMinutes,
                    },
                }),
            },
            ...(sort && { orderBy: { [sort]: order ?? 'asc' } }),
            ...(limit && { take: limit }),
            ...(limit && page && { take: limit, skip: (page - 1) * limit }),
        };
    }

    private calculateParticipants(workout: Workout & { orders: (WorkoutOrder & { client: User })[] }) {
        return {
            ...workout,
            participants: (workout.orders ?? [])
                .filter((order) => order.status !== ORDER_STATUS.CANCELLED)
                .map((order) => order.client),
        };
    }
}
