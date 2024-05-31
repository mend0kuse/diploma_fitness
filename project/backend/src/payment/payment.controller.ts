import { Controller, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestWithUser } from 'src/user/user';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post('/:ticketId')
    @UseGuards(AuthGuard)
    createPayment(@Param('ticketId', ParseIntPipe) ticketId: number, @Req() { user }: RequestWithUser) {
        return this.paymentService.createPaymentUrl(ticketId, user.id);
    }

    @Get('/:orderId')
    getOrderInfo(@Param('orderId') orderId: string) {
        return this.paymentService.getOrderInfoById(orderId);
    }

    @Put('freeze/:paymentId')
    freezePayment(@Param('paymentId') paymentId: string) {
        return this.paymentService.freezePayment(paymentId);
    }
}
