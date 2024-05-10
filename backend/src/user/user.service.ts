import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Profile } from '@prisma/client';
import { excludeFields } from 'src/shared/lib/excludeFields';
import { PrismaService } from 'src/prisma/prisma.service';
import { mapUserChat } from 'src/shared/lib/mapChat';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    private include = {
        profile: true,
        myReviews: {
            include: {
                author: {
                    include: {
                        profile: true,
                    },
                },
            },
        },
        payments: true,
        leavedReviews: {
            include: {
                author: {
                    include: {
                        profile: true,
                    },
                },
            },
        },
        chats: {
            include: {
                chat: {
                    include: {
                        messages: { include: { user: { include: { profile: true } } } },
                        users: { include: { user: { include: { profile: true } } } },
                    },
                },
            },
        },
        orders: {
            include: {
                workout: {
                    include: {
                        trainer: {
                            include: {
                                profile: true,
                            },
                        },
                    },
                },
            },
        },
    };

    async getOne({ id, email }: { id?: number; email?: string }) {
        const result = await this.prisma.user.findFirst({
            where: { OR: [{ id: { equals: id } }, { email: { equals: email } }] },
            include: this.include,
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return mapUserChat(result);
    }

    async getMany(args: Prisma.UserFindManyArgs) {
        return this.prisma.user.findMany({
            ...args,
            include: this.include,
        });
    }

    async createUser(data: Prisma.UserCreateInput) {
        const found = await this.getOne({ email: data.email });

        if (found) {
            throw new BadRequestException('Пользователь с таким email уже существует');
        }

        const created = await this.prisma.user.create({
            data: {
                ...data,
                profile: { create: {} },
            },
        });

        return excludeFields(created, ['password']);
    }

    async update({ id, data }: { data: Prisma.UserUpdateInput; id: number }) {
        const found = await this.getOne({ id });

        if (!found) {
            throw new BadRequestException('Пользователь с таким email не существует');
        }

        const updated = await this.prisma.user.update({
            where: { id: found.id },
            data,
            include: this.include,
        });

        return excludeFields(updated, ['password']);
    }

    async updateProfile({ profile, email }: { email?: string; profile: Profile }) {
        const updated = await this.prisma.user.update({
            where: { email },
            data: {
                profile: {
                    update: profile,
                },
            },
            include: this.include,
        });

        return excludeFields(updated, ['password']);
    }
}
