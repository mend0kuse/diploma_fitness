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
exports.WorkoutService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const calculateParticipants_1 = require("../shared/lib/calculateParticipants");
let WorkoutService = class WorkoutService {
    constructor(prismaService) {
        this.prismaService = prismaService;
        this.include = {
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
    }
    createWorkout({ trainerId, ...data }) {
        return this.prismaService.workout.create({
            data: {
                ...data,
                status: 'pending',
                trainer: {
                    connect: {
                        id: Number(trainerId),
                    },
                },
            },
            include: this.include,
        });
    }
    async getWorkouts(query = {}) {
        const args = this.generateFindArguments(query);
        const workouts = await this.prismaService.workout.findMany({
            ...args,
            include: this.include,
        });
        const result = workouts.map((item) => (0, calculateParticipants_1.calculateParticipants)(item));
        if (!query.hasAvailablePlaces) {
            return result;
        }
        return result?.filter((item) => item.participants.length !== item.maxPlaces);
    }
    async getWorkoutById(id) {
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
        return (0, calculateParticipants_1.calculateParticipants)(found);
    }
    deleteWorkout(id) {
        return this.prismaService.workout.delete({
            where: { id },
        });
    }
    editWorkout(args) {
        return this.prismaService.workout.update({ ...args, include: this.include });
    }
    generateFindArguments({ sort, dateStart, type, limit, order, page, dateEnd, trainerId, userId, }) {
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
};
exports.WorkoutService = WorkoutService;
exports.WorkoutService = WorkoutService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkoutService);
//# sourceMappingURL=workout.service.js.map