"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeFields = void 0;
function excludeFields(obj, keys) {
    const tmp = obj;
    for (const key in tmp) {
        if (keys.includes(key)) {
            delete tmp[key];
        }
    }
    return tmp;
}
exports.excludeFields = excludeFields;
//# sourceMappingURL=excludeFields.js.map