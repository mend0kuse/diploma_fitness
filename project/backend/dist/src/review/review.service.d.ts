import { TrainerReview } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ReviewService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createReview({ isHiddenUser, rating, text, authorId, userId }: Omit<TrainerReview, 'id'>): import(".prisma/client").Prisma.Prisma__TrainerReviewClient<{
        id: number;
        rating: number;
        text: string;
        isHiddenUser: boolean;
        userId: number;
        authorId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getReviewsByUserId(userId: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        rating: number;
        text: string;
        isHiddenUser: boolean;
        userId: number;
        authorId: number;
    }[]>;
    getReviewsByAuthorId(authorId: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        rating: number;
        text: string;
        isHiddenUser: boolean;
        userId: number;
        authorId: number;
    }[]>;
}
