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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const excludeFields_1 = require("../shared/lib/excludeFields");
const user_service_1 = require("../user/user.service");
const constans_1 = require("./constans");
const roles_1 = require("./roles");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signIn(dto) {
        const user = await this.usersService.getOne({ email: dto.email });
        if (!user) {
            throw new common_1.UnauthorizedException('Неправильная почта');
        }
        const isMatch = await bcrypt.compare(dto.password, user?.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Неправильный пароль');
        }
        return {
            access_token: await this.jwtService.signAsync((0, excludeFields_1.excludeFields)(user, ['password'])),
        };
    }
    async signUp(user) {
        const hashed = await bcrypt.hash(user.password, constans_1.JWT.SALT_OR_ROUNDS);
        return this.usersService.createUser({
            email: user.email,
            role: roles_1.USER_ROLE.USER,
            password: hashed,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map