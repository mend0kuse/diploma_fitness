import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DelayMiddleware } from './delay.service';
import { ChatModule } from './chat/chat.module';

@Module({
    imports: [UserModule, AuthModule, ChatModule],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(DelayMiddleware).forRoutes('*');
    }
}
