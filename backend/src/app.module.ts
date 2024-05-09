import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DelayMiddleware } from './delay.service';
import { ChatModule } from './chat/chat.module';
import { WorkoutModule } from './workout/workout.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';

@Module({
    imports: [UserModule, AuthModule, ChatModule, WorkoutModule, OrderModule, ReviewModule],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(DelayMiddleware).forRoutes('*');
    }
}
