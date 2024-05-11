import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import axios from 'axios';
import * as dayjs from 'dayjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

const TEST_CARD = 2202474301322987;

const TICKETS = {
    1: {
        amount: {
            value: '5000.00',
            currency: 'RUB',
        },
        description: 'Месячный абонемент',
        months: 1,
    },
    2: {
        amount: {
            value: '25000.00',
            currency: 'RUB',
        },
        description: 'Полугодовой абонемент',
        months: 6,
    },
    3: {
        amount: {
            value: '45000.00',
            currency: 'RUB',
        },
        description: 'Годовой абонемент',
        months: 12,
    },
} as const;

/**
 * FIXME:
 * Succeed status only with return to site after payment. Need refactor save payment flow
 */

@Injectable()
export class PaymentService {
    constructor(
        private prismaService: PrismaService,
        private configService: ConfigService
    ) {}

    testShopId = this.configService.get<string>('TEST_SHOP_ID');
    privateKey = this.configService.get<string>('PRIVATE_SHOP_KEY');

    private auth = Buffer.from(`${this.testShopId}:${this.privateKey}`).toString('base64');

    createPayment(data: Prisma.PaymentCreateInput) {
        return this.prismaService.payment.create({
            data,
        });
    }

    getPaymentByOrderId(orderId: string) {
        return this.prismaService.payment.findFirst({
            where: {
                order_id: orderId,
            },
        });
    }

    updatePayment(data: Prisma.PaymentUpdateArgs) {
        return this.prismaService.payment.update(data);
    }

    async createPaymentUrl(ticketId: number, userId: number) {
        const idempotenceKey = uuidv4();

        const ticket = TICKETS[ticketId];

        const body = {
            description: ticket.description,
            amount: ticket.amount,
            payment_method_data: {
                type: 'bank_card',
            },
            capture: true,
            confirmation: {
                type: 'redirect',
                return_url: `http://localhost:3000/payment-finish?order_id=${idempotenceKey}`,
            },
            metadata: {
                orderId: idempotenceKey,
                months: ticket.months,
                ticketId,
            },
        };

        try {
            const { data } = await axios.post('https://api.yookassa.ru/v3/payments', body, {
                headers: {
                    'Idempotence-Key': idempotenceKey,
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${this.auth}`,
                },
            });

            const payment = await this.createPayment({
                currency: 'RUB',
                description: data.description,
                id: data.id,
                paid: data.paid,
                order_id: data.metadata.orderId,
                ticketId: Number(data.metadata.ticketId),
                value: data.amount.value,
                createdAt: data.created_at,
                user: {
                    connect: {
                        id: userId,
                    },
                },
                status: data.status,
                expiresAt: dayjs(data.created_at).add(Number(data.metadata.months), 'months').toDate(),
            });

            return { ...payment, confirmation: data.confirmation.confirmation_url };
        } catch (err) {
            console.log(err);
            return err.response.data;
        }
    }

    async getOrderInfoById(clientOrderId: string) {
        try {
            const payment = await this.getPaymentByOrderId(clientOrderId);

            const result = await axios.get(`https://api.yookassa.ru/v3/payments/${payment.id}`, {
                headers: {
                    Authorization: `Basic ${this.auth}`,
                },
            });

            await this.updatePayment({ where: { id: result.data.id }, data: { status: result.data.status } });

            return result.data;
        } catch (err) {
            console.log(err);
            return err.response.data;
        }
    }
}
