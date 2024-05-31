"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpDto = void 0;
const zod_1 = require("zod");
exports.signUpDto = zod_1.z
    .object({
    email: zod_1.z.string().email({ message: 'Невалидная почта' }),
    password: zod_1.z.string().min(7, { message: 'Пароль должен содержать минимум 7 символов' }),
})
    .required();
//# sourceMappingURL=profile-schemas.js.map