"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const excludeFields_1 = require("../shared/lib/excludeFields");
const prisma_service_1 = require("../prisma/prisma.service");
const mapChat_1 = require("../shared/lib/mapChat");
const calculateParticipants_1 = require("../shared/lib/calculateParticipants");
const order_1 = require("../order/order");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
        this.include = {
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
    }
    async getUserOrders(user) {
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
        return workouts.map(calculateParticipants_1.calculateParticipants);
    }
    async getOne({ id, email }) {
        const result = await this.prisma.user.findFirst({
            where: { OR: [{ id: { equals: id } }, { email: { equals: email } }] },
            include: this.include,
        });
        if (!result) {
            return null;
        }
        return (0, mapChat_1.mapUserChat)(result);
    }
    async getMany(args) {
        return this.prisma.user.findMany({
            ...args,
            include: this.include,
        });
    }
    async createUser(data) {
        const found = await this.getOne({ email: data.email });
        if (found) {
            throw new common_1.BadRequestException('Пользователь с таким email уже существует');
        }
        const created = await this.prisma.user.create({
            data: {
                ...data,
                profile: { create: {} },
            },
        });
        return (0, excludeFields_1.excludeFields)(created, ['password']);
    }
    async update({ id, data }) {
        const found = await this.getOne({ id });
        if (!found) {
            throw new common_1.BadRequestException('Пользователь с таким email не существует');
        }
        const updated = await this.prisma.user.update({
            where: { id: found.id },
            data,
            include: this.include,
        });
        return (0, excludeFields_1.excludeFields)(updated, ['password']);
    }
    async updateProfile({ profile, email }) {
        const updated = await this.prisma.user.update({
            where: { email },
            data: {
                profile: {
                    update: profile,
                },
            },
            include: this.include,
        });
        return (0, excludeFields_1.excludeFields)((0, mapChat_1.mapUserChat)(updated), ['password']);
    }
    findAdmin() {
        return this.prisma.user.findFirst({
            where: { role: 'admin' },
        });
    }
    async getStats(user) {
        const orders = await this.prisma.workoutOrder.findMany({
            where: { clientId: user.id },
            include: {
                workout: true,
            },
        });
        const completedWorkouts = {};
        let completedWorkoutsCount = 0;
        let missedWorkoutsCount = 0;
        let canceledWorkoutsCount = 0;
        orders.forEach((order) => {
            if (order.status === order_1.ORDER_STATUS.COMPLETED) {
                const sportType = order.workout.sportType;
                if (!completedWorkouts[sportType]) {
                    completedWorkouts[sportType] = 0;
                }
                completedWorkouts[sportType]++;
                completedWorkoutsCount++;
            }
            if (order.status === order_1.ORDER_STATUS.MISSING) {
                missedWorkoutsCount++;
            }
            if (order.status === order_1.ORDER_STATUS.CANCELLED) {
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map