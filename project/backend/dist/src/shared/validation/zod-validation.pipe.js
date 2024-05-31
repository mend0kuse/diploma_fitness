"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidationPipe = void 0;
const common_1 = require("@nestjs/common");
class ZodValidationPipe {
    constructor(schema) {
        this.schema = schema;
    }
    transform(value) {
        const parsed = this.schema.safeParse(value);
        if (!parsed.success) {
            throw new common_1.BadRequestException(parsed.error.issues.map((issue) => issue.message).join('; '));
        }
        return parsed.data;
    }
}
exports.ZodValidationPipe = ZodValidationPipe;
//# sourceMappingURL=zod-validation.pipe.js.map