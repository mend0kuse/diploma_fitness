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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutController = void 0;
const common_1 = require("@nestjs/common");
const workout_service_1 = require("./workout.service");
const order_service_1 = require("../order/order.service");
let WorkoutController = class WorkoutController {
    constructor(workoutService, orderService) {
        this.workoutService = workoutService;
        this.orderService = orderService;
    }
    getWorkouts(query) {
        return this.workoutService.getWorkouts(query);
    }
    getWorkoutById(id) {
        return this.workoutService.getWorkoutById(Number(id));
    }
    createWorkout(dto) {
        return this.workoutService.createWorkout(dto);
    }
    async completeWorkout(id, { visitedUserIds }) {
        await this.orderService.completeByWorkout(id, visitedUserIds);
        return this.workoutService.editWorkout({ where: { id }, data: { status: 'completed' } });
    }
    deleteWorkout(id) {
        return this.workoutService.deleteWorkout(id);
    }
    editWorkout(id, dto) {
        return this.workoutService.editWorkout({ where: { id }, data: dto });
    }
};
exports.WorkoutController = WorkoutController;
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorkoutController.prototype, "getWorkouts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WorkoutController.prototype, "getWorkoutById", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorkoutController.prototype, "createWorkout", null);
__decorate([
    (0, common_1.Put)('complete/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], WorkoutController.prototype, "completeWorkout", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WorkoutController.prototype, "deleteWorkout", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], WorkoutController.prototype, "editWorkout", null);
exports.WorkoutController = WorkoutController = __decorate([
    (0, common_1.Controller)('workout'),
    __metadata("design:paramtypes", [workout_service_1.WorkoutService,
        order_service_1.OrderService])
], WorkoutController);
//# sourceMappingURL=workout.controller.js.map