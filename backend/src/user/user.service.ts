import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Profile, User, Workout } from '@prisma/client';
import { excludeFields } from 'src/shared/lib/excludeFields';
import { PrismaService } from 'src/prisma/prisma.service';
import { mapUserChat } from 'src/shared/lib/mapChat';
import { calculateParticipants } from 'src/shared/lib/calculateParticipants';
import { ORDER_STATUS } from 'src/order/order';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    private include = {
        profile: true,
        myReviews: {
            include: {
                author: {
                    include: {
                        profile: true,
                    },
                },
            },
        },
        payments: true,
        leavedReviews: {
            include: {
                author: {
                    include: {
                        profile: true,
                    },
                },
            },
        },
        chats: {
            include: {
                chat: {
                    include: {
                        messages: { include: { user: { include: { profile: true } } } },
                        users: { include: { user: { include: { profile: true } } } },
                    },
                },
            },
        },
    };

    async getUserOrders(user: User) {
        if (user.role === 'user') {
            return this.prisma.workoutOrder.findMany({
                where: { clientId: user.id },
                include: {
                    workout: {
                        include: {
                            trainer: {
                                include: {
                                    profile: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    workout: {
                        dateStart: 'desc',
                    },
                },
            });
        }

        const workouts = await this.prisma.workout.findMany({
            where: { status: 'pending' },
            include: {
                trainer: { include: { profile: true } },
                orders: { include: { client: { include: { profile: true } } } },
            },
            orderBy: {
                dateStart: 'desc',
            },
        });

        return workouts.map(calculateParticipants);
    }

    async getOne({ id, email }: { id?: number; email?: string }) {
        const result = await this.prisma.user.findFirst({
            where: { OR: [{ id: { equals: id } }, { email: { equals: email } }] },
            include: this.include,
        });

        if (!result) {
            return null;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return mapUserChat(result);
    }

    async getMany(args: Prisma.UserFindManyArgs) {
        return this.prisma.user.findMany({
            ...args,
            include: this.include,
        });
    }

    async createUser(data: Prisma.UserCreateInput) {
        const found = await this.getOne({ email: data.email });

        if (found) {
            throw new BadRequestException('Пользователь с таким email уже существует');
        }

        const created = await this.prisma.user.create({
            data: {
                ...data,
                profile: { create: {} },
            },
        });

        return excludeFields(created, ['password']);
    }

    async update({ id, data }: { data: Prisma.UserUpdateInput; id: number }) {
        const found = await this.getOne({ id });

        if (!found) {
            throw new BadRequestException('Пользователь с таким email не существует');
        }

        const updated = await this.prisma.user.update({
            where: { id: found.id },
            data,
            include: this.include,
        });

        return excludeFields(updated, ['password']);
    }

    async updateProfile({ profile, email }: { email?: string; profile: Profile }) {
        const updated = await this.prisma.user.update({
            where: { email },
            data: {
                profile: {
                    update: profile,
                },
            },
            include: this.include,
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return excludeFields(mapUserChat(updated), ['password']);
    }

    findAdmin() {
        return this.prisma.user.findFirst({
            where: { role: 'admin' },
        });
    }

    async getStats(user: User) {
        const orders = await this.prisma.workoutOrder.findMany({
            where: { clientId: user.id },
            include: {
                workout: true,
            },
        });

        const completedWorkouts: Record<string, number> = {};

        let completedWorkoutsCount = 0;
        let missedWorkoutsCount = 0;
        let canceledWorkoutsCount = 0;

        orders.forEach((order) => {
            if (order.status === ORDER_STATUS.COMPLETED) {
                const sportType = order.workout.sportType;

                if (!completedWorkouts[sportType]) {
                    completedWorkouts[sportType] = 0;
                }

                completedWorkouts[sportType]++;
                completedWorkoutsCount++;
            }

            if (order.status === ORDER_STATUS.MISSING) {
                missedWorkoutsCount++;
            }

            if (order.status === ORDER_STATUS.CANCELLED) {
                canceledWorkoutsCount++;
            }
        });

        return {
            workouts: Object.entries(completedWorkouts).map(([type, count]) => {
                return {
                    label: type,
                    value: count,
                };
            }),
            attendance: {
                visited: completedWorkoutsCount,
                missed: missedWorkoutsCount,
                canceled: canceledWorkoutsCount,
            },
        };
    }
}
