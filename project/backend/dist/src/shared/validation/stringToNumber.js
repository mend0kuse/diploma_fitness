"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToNumber = void 0;
const zod_1 = require("zod");
exports.stringToNumber = zod_1.z.string().transform((val, ctx) => {
    const parsed = Number(val);
    if (isNaN(parsed)) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: 'Ожидается число',
        });
        return zod_1.z.NEVER;
    }
    return parsed;
});
//# sourceMappingURL=stringToNumber.js.map