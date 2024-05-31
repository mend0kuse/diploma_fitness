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
exports.UserController = void 0;
const exceptions_1 = require("@nestjs/common/exceptions");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const excludeFields_1 = require("../shared/lib/excludeFields");
const user_service_1 = require("./user.service");
const platform_express_1 = require("@nestjs/platform-express");
const makeImagePath_1 = require("../shared/lib/makeImagePath");
const multer_1 = require("multer");
const path_1 = require("path");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    updateProfile(request, dto, file) {
        return this.userService.updateProfile({
            email: request.user?.email,
            profile: { ...dto, avatar: file ? (0, makeImagePath_1.makeImagePath)(file) : undefined },
        });
    }
    async getTrainers() {
        return this.userService.getMany({ where: { role: { equals: 'trainer' } } });
    }
    async getUserOrders({ user }) {
        return this.userService.getUserOrders(user);
    }
    async getUserStats({ user }) {
        return this.userService.getStats(user);
    }
    async getOne(id) {
        const found = await this.userService.getOne({ id });
        if (!found) {
            throw new exceptions_1.NotFoundException();
        }
        return (0, excludeFields_1.excludeFields)(found, ['password']);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Patch)('profile'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', {
        storage: (0, multer_1.diskStorage)({
            destination: 'uploads/',
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder().build({
        fileIsRequired: false,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('trainer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getTrainers", null);
__decorate([
    (0, common_1.Get)('order'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserOrders", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOne", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map