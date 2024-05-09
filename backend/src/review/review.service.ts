import { Injectable } from '@nestjs/common';
import { TrainerReview } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
    constructor(private prismaService: PrismaService) {}

    async createReview(data: Omit<TrainerReview, 'id'>) {
        return this.prismaService.trainerReview.create({
            data,
        });
    }

    async getReviewsByUserId(userId: number) {
        return this.prismaService.trainerReview.findMany({
            where: { userId },
        });
    }
}
