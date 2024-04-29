import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';

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
    async getOrdersById(@Param('id') id: number) {
        return this.orderService.getOrdersById(id);
    }

    @Post('user/:id')
    async createOrder(@Param('id') id: number, @Body() { workoutId }: { workoutId: number }) {
        return this.orderService.createOrder({ clientId: id, workoutId });
    }

    @Put('cancel/:id')
    async cancelOrder(@Param('id') id: number) {
        return this.orderService.cancelOrder(id);
    }
}
