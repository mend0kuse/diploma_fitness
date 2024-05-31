import { ReviewService } from './review.service';
import { TrainerReview } from '@prisma/client';
export declare class ReviewController {
    private reviewService;
    constructor(reviewService: ReviewService);
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
    getReviewsByTrainerId(data: Omit<TrainerReview, 'id'>): import(".prisma/client").Prisma.Prisma__TrainerReviewClient<{
        id: number;
        rating: number;
        text: string;
        isHiddenUser: boolean;
        userId: number;
        authorId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
