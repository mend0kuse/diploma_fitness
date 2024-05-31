"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
(async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const corsOptions = {
        origin: 'http://localhost:3000',
    };
    app.useStaticAssets((0, path_1.join)(__dirname, '..', '..', 'uploads'));
    app.enableCors(corsOptions);
    await app.listen(8000);
})();
//# sourceMappingURL=main.js.map