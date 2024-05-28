import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function createUsers() {
    await prisma.user.create({
        data: {
            email: 'user@mail.ru',
            role: 'user',
            password: await bcrypt.hash('user1234', 10),
            profile: {
                create: {
                    name: 'Иван Петров',
                    status: 'Люблю спорт!',
                },
            },
        },
    });

    await prisma.user.create({
        data: {
            email: 'trainer@mail.ru',
            role: 'trainer',
            password: await bcrypt.hash('trainer1234', 10),
            profile: {
                create: {
                    name: 'Артем Иванов',
                    status: 'Доведем вас до результата',
                },
            },
        },
    });

    return prisma.user.create({
        data: {
            email: 'admin@mail.ru',
            role: 'admin',
            password: await bcrypt.hash('admin1234', 10),
            profile: {
                create: {
                    name: 'Виктор Торбосов',
                },
            },
        },
    });
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

    await prisma.workout.create({
        data: {
            trainer: {
                connect: {
                    id: 2,
                },
            },
            title: 'Утренняя зарядка',
            description: 'Зарядка для улучшения общего самочувствия',
            sportType: 'Фитнес',
            status: 'pending',
            maxPlaces: 10,
            dateStart: new Date('2024-05-30T16:00:00'),
            durationMinutes: 60,
        },
    });

    await prisma.workout.create({
        data: {
            trainer: {
                connect: {
                    id: 2,
                },
            },
            title: 'Урок йоги для начинающих',
            description: 'Занятие для освоения базовых асан и элементов йоги',
            sportType: 'Йога',
            status: 'pending',
            maxPlaces: 10,
            dateStart: new Date('2024-05-30T18:00:00'),
            durationMinutes: 60,
        },
    });

    await prisma.workout.create({
        data: {
            trainer: {
                connect: {
                    id: 2,
                },
            },
            title: 'Пилатес для укрепления мышц спины',
            description: 'Тренировка направлена на укрепление мышц спины и коррекцию осанки',
            sportType: 'Пилатес',
            status: 'pending',
            maxPlaces: 10,
            dateStart: new Date('2024-05-30T14:00:00'),
            durationMinutes: 60,
        },
    });

    await prisma.workout.create({
        data: {
            trainer: {
                connect: {
                    id: 2,
                },
            },
            title: 'Функциональный тренинг для сжигания жира',
            description: 'Интенсивная тренировка для ускорения обмена веществ и сжигания жира',
            sportType: 'Фитнес',
            status: 'pending',
            maxPlaces: 10,
            dateStart: new Date('2024-05-25T14:00:00'),
            durationMinutes: 60,
        },
    });

    await prisma.workout.create({
        data: {
            trainer: {
                connect: {
                    id: 2,
                },
            },
            title: 'Техника ударов в боксе',
            description: 'Обучение корректной технике ударов и блокировок в боксе',
            sportType: 'Бокс',
            status: 'pending',
            maxPlaces: 10,
            dateStart: new Date('2024-05-25T16:00:00'),
            durationMinutes: 60,
        },
    });

    return prisma.workout.create({
        data: {
            trainer: {
                connect: {
                    id: 2,
                },
            },
            title: 'Повышение гибкости через йогу',
            description: 'Урок для развития гибкости и укрепления тела через позы йоги',
            sportType: 'Йога',
            status: 'pending',
            maxPlaces: 10,
            dateStart: new Date('2024-05-25T17:00:00'),
            durationMinutes: 120,
        },
    });
}

async function createOrders() {
    await prisma.workoutOrder.create({
        data: {
            client: {
                connect: {
                    id: 1,
                },
            },
            status: 'COMPLETED',
            workout: {
                connect: {
                    id: 6,
                },
            },
        },
    });

    await prisma.workoutOrder.create({
        data: {
            client: {
                connect: {
                    id: 1,
                },
            },
            status: 'MISSING',
            workout: {
                connect: {
                    id: 5,
                },
            },
        },
    });

    return prisma.workoutOrder.create({
        data: {
            client: {
                connect: {
                    id: 1,
                },
            },
            status: 'COMPLETED',
            workout: {
                connect: {
                    id: 4,
                },
            },
        },
    });
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
