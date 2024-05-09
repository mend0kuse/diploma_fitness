import { Injectable } from '@nestjs/common';
import { TrainerReview } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
    constructor(private prismaService: PrismaService) {}

    async createReview({ isHiddenUser, rating, text, authorId, userId }: Omit<TrainerReview, 'id'>) {
        return this.prismaService.trainerReview.create({
            data: {
                isHiddenUser,
                rating,
                text,
                author: {
                    connect: {
                        id: authorId,
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    async getReviewsByUserId(userId: number) {
        return this.prismaService.trainerReview.findMany({
            where: { userId },
        });
    }

    async getReviewsByAuthorId(authorId: number) {
        return this.prismaService.trainerReview.findMany({
            where: { authorId },
        });
    }
}
