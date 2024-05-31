"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = void 0;
const fs = require("node:fs");
const path = require("node:path");
const deleteImage = (imgName) => {
    const src = path.join(__dirname, '..', '..', '..', 'uploads', imgName);
    if (fs.existsSync(src)) {
        fs.unlink(src, (err) => {
            if (err)
                throw err;
            console.log(`uploads/${imgName} was deleted`);
        });
    }
    else {
        console.log('File not found');
    }
};
exports.deleteImage = deleteImage;
//# sourceMappingURL=deleteImage.js.map