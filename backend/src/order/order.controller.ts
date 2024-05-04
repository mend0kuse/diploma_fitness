import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '../auth/auth.guard';
import { RequestWithUser } from '../user/user';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get('')
    async getOrders() {
        return this.orderService.getOrders();
    }

    @Get('user/:id')
    async getOrdersByUserId(@Param('id') id: number) {
        return this.orderService.getOrdersByUserId(id);
    }

    @Get(':id')
    async getOrderById(@Param('id') id: number) {
        return this.orderService.getOrderById(id);
    }

    @Post(':workoutId')
    @UseGuards(AuthGuard)
    async createOrder(@Param('workoutId', ParseIntPipe) workoutId: number, @Req() { user }: RequestWithUser) {
        return this.orderService.createOrder({ clientId: user.id, workoutId });
    }

    @Put('cancel/:id')
    async cancelOrder(@Param('id', ParseIntPipe) id: number) {
        return this.orderService.cancelOrder(id);
    }
}
