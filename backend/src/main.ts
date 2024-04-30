import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

(async () => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const corsOptions: CorsOptions = {
        origin: 'http://localhost:3000',
    };

    app.useStaticAssets(join(__dirname, '..', 'uploads'));
    app.enableCors(corsOptions);

    await app.listen(8000);
})();

/**
 * ToDo
 *
 * ---
 * Notifications
 * - Workout cancelled
 * - Workout completed
 * - Chat
 */
