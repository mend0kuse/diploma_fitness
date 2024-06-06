import { PrismaClient } from '@prisma/client';
import { mockOrders, mockUsers, mockWorkouts } from './mock-data';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createUsers() {
    for (const user of mockUsers) {
        await prisma.user.create({
            data: {
                email: user.email,
                role: user.role,
                password: await bcrypt.hash(user.password, 10),
                profile: {
                    create: {
                        name: user.name,
                        status: user.status,
                        avatar: user.avatar,
                    },
                },
            },
        });
    }
}

async function createWorkouts() {
    await prisma.trainerReview.create({
        data: {
            rating: 5,
            text: 'Отличный тренер!',
            isHiddenUser: false,
            user: {
                connect: {
                    id: 2,
                },
            },
            author: {
                connect: {
                    id: 1,
                },
            },
        },
    });

    for (const workout of mockWorkouts) {
        await prisma.workout.create({
            data: {
                trainer: {
                    connect: {
                        id: workout.trainerId,
                    },
                },
                title: workout.title,
                description: workout.description,
                sportType: workout.sportType,
                status: workout.status,
                maxPlaces: workout.maxPlaces,
                dateStart: workout.dateStart,
                durationMinutes: workout.durationMinutes,
            },
        });
    }
}

async function createOrders() {
    for (const order of mockOrders) {
        await prisma.workoutOrder.create({
            data: {
                client: {
                    connect: {
                        id: order.clientId,
                    },
                },
                status: order.status,
                workout: {
                    connect: {
                        id: order.workoutId,
                    },
                },
            },
        });
    }
}

async function main() {
    await createUsers();
    await createWorkouts();
    await createOrders();
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
