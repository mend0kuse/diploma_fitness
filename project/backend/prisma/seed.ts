import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

const users = [
    { email: 'user@mail.ru', role: 'user', password: 'user1234', name: 'Иван Петров', status: 'Люблю спорт!' },
    {
        email: 'admin@mail.ru',
        role: 'admin',
        password: 'admin1234',
        name: 'Виктор Торбосов',
        status: 'Решу ваш вопрос',
    },
    {
        email: 'trainer@mail.ru',
        role: 'trainer',
        password: 'trainer1234',
        name: 'Артем Иванов',
        status: 'Доведем вас до результата',
    },
];

const workouts = [
    {
        trainerId: 2,
        title: 'Утренняя зарядка',
        description: 'Зарядка для улучшения общего самочувствия',
        sportType: 'Фитнес',
        status: 'pending',
        maxPlaces: 10,
        dateStart: new Date('2024-05-30T16:00:00'),
        durationMinutes: 60,
    },
    {
        trainerId: 2,
        title: 'Урок йоги для начинающих',
        description: 'Занятие для освоения базовых асан и элементов йоги',
        sportType: 'Йога',
        status: 'pending',
        maxPlaces: 10,
        dateStart: new Date('2024-05-30T18:00:00'),
        durationMinutes: 60,
    },
    {
        trainerId: 2,
        title: 'Функциональный тренинг для сжигания жира',
        description: 'Интенсивная тренировка для ускорения обмена веществ и сжигания жира',
        sportType: 'Фитнес',
        status: 'pending',
        maxPlaces: 10,
        dateStart: new Date('2024-05-25T14:00:00'),
        durationMinutes: 60,
    },
    {
        trainerId: 2,
        title: 'Пилатес для укрепления мышц спины',
        description: 'Тренировка направлена на укрепление мышц спины и коррекцию осанки',
        sportType: 'Пилатес',
        status: 'pending',
        maxPlaces: 10,
        dateStart: new Date('2024-05-30T14:00:00'),
        durationMinutes: 60,
    },
    {
        trainerId: 2,
        title: 'Техника ударов в боксе',
        description: 'Обучение корректной технике ударов и блокировок в боксе',
        sportType: 'Бокс',
        status: 'pending',
        maxPlaces: 10,
        dateStart: new Date('2024-05-25T16:00:00'),
        durationMinutes: 60,
    },
    {
        trainerId: 2,
        title: 'Повышение гибкости через йогу',
        description: 'Урок для развития гибкости и укрепления тела через позы йоги',
        sportType: 'Йога',
        status: 'pending',
        maxPlaces: 10,
        dateStart: new Date('2024-05-25T17:00:00'),
        durationMinutes: 120,
    },
];

const orders = [
    {
        clientId: 1,
        status: 'COMPLETED',
        workoutId: 6,
    },
    {
        clientId: 1,
        status: 'MISSING',
        workoutId: 5,
    },
    {
        clientId: 1,
        status: 'COMPLETED',
        workoutId: 4,
    },
];

async function createUsers() {
    for (const user of users) {
        await prisma.user.create({
            data: {
                email: user.email,
                role: user.role,
                password: await bcrypt.hash(user.password, 10),
                profile: {
                    create: {
                        name: user.name,
                        status: user.status,
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

    for (const workout of workouts) {
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
    for (const order of orders) {
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
