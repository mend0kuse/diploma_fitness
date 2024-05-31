import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class PaymentService {
    private prismaService;
    private configService;
    constructor(prismaService: PrismaService, configService: ConfigService);
    testShopId: string;
    privateKey: string;
    private auth;
    createPayment(data: Prisma.PaymentCreateInput): Prisma.Prisma__PaymentClient<{
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
    getPaymentByOrderId(orderId: string): Prisma.Prisma__PaymentClient<{
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    freezePayment(id: string): Prisma.Prisma__PaymentClient<{
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
    updatePayment(data: Prisma.PaymentUpdateArgs): Prisma.Prisma__PaymentClient<{
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
    createPaymentUrl(ticketId: number, userId: number): Promise<any>;
    getOrderInfoById(clientOrderId: string): Promise<any>;
}
