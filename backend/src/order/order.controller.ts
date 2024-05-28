import { Controller, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '../auth/auth.guard';
import { RequestWithUser } from '../user/user';
import { ORDER_STATUS } from './order';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get('')
    getOrders() {
        return this.orderService.getOrders();
    }

    @Get('user/:id')
    getOrdersByUserId(@Param('id') id: number) {
        return this.orderService.getOrdersByUserId(id);
    }

    @Get(':id')
    getOrderById(@Param('id') id: number) {
        return this.orderService.getOrderById(id);
    }

    @Post(':workoutId')
    @UseGuards(AuthGuard)
    async createOrderByWorkoutId(
        @Param('workoutId', ParseIntPipe) workoutId: number,
        @Req() { user }: RequestWithUser
    ) {
        const existedOrder = await this.orderService.getUserOrderByWorkoutId(user.id, workoutId);

        if (existedOrder) {
            return this.orderService.editOrder(existedOrder.id, { status: ORDER_STATUS.PENDING });
        }

        return this.orderService.createOrder({ clientId: user.id, workoutId });
    }

    @Put('cancel/:id')
    cancelOrder(@Param('id', ParseIntPipe) id: number) {
        return this.orderService.cancelOrder(id);
    }
}
