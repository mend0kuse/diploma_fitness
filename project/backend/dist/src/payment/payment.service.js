"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
const dayjs = require("dayjs");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
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
};
let PaymentService = class PaymentService {
    constructor(prismaService, configService) {
        this.prismaService = prismaService;
        this.configService = configService;
        this.testShopId = this.configService.get('TEST_SHOP_ID');
        this.privateKey = this.configService.get('PRIVATE_SHOP_KEY');
        this.auth = Buffer.from(`${this.testShopId}:${this.privateKey}`).toString('base64');
    }
    createPayment(data) {
        return this.prismaService.payment.create({
            data,
        });
    }
    getPaymentByOrderId(orderId) {
        return this.prismaService.payment.findFirst({
            where: {
                order_id: orderId,
            },
        });
    }
    freezePayment(id) {
        return this.prismaService.payment.update({
            where: {
                id,
            },
            data: {
                freezeEndDate: dayjs().add(1, 'months').toDate(),
            },
        });
    }
    updatePayment(data) {
        return this.prismaService.payment.update(data);
    }
    async createPaymentUrl(ticketId, userId) {
        const idempotenceKey = (0, uuid_1.v4)();
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
            const { data } = await axios_1.default.post('https://api.yookassa.ru/v3/payments', body, {
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
        }
        catch (err) {
            console.log(err);
            return err.response.data;
        }
    }
    async getOrderInfoById(clientOrderId) {
        try {
            const payment = await this.getPaymentByOrderId(clientOrderId);
            const result = await axios_1.default.get(`https://api.yookassa.ru/v3/payments/${payment.id}`, {
                headers: {
                    Authorization: `Basic ${this.auth}`,
                },
            });
            await this.updatePayment({ where: { id: result.data.id }, data: { status: result.data.status } });
            return result.data;
        }
        catch (err) {
            console.log(err);
            return err.response.data;
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map