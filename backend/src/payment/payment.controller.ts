import { Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
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
    async getOrderInfo(@Param('orderId') orderId: string) {
        const result = await this.paymentService.getOrderInfoById(orderId);

        return result;
    }
}
