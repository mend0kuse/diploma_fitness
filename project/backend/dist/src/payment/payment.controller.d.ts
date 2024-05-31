import { PaymentService } from './payment.service';
import { RequestWithUser } from 'src/user/user';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createPayment(ticketId: number, { user }: RequestWithUser): Promise<any>;
    getOrderInfo(orderId: string): Promise<any>;
    freezePayment(paymentId: string): import(".prisma/client").Prisma.Prisma__PaymentClient<{
        id: string;
        order_id: string;
        ticketId: number;
        status: string;
        paid: boolean;
        description: string;
        value: string;
        currency: string;
        createdAt: Date;
        expiresAt: Date;
        freezeEndDate: Date;
        userId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
