import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { TrainerReview } from '@prisma/client';

@Controller('review')
export class ReviewController {
    constructor(private reviewService: ReviewService) {}

    @Get('/user/:userId')
    getReviewsByUserId(userId: number) {
        return this.reviewService.getReviewsByUserId(userId);
    }

    @Get('/author/:authorId')
    getReviewsByAuthorId(authorId: number) {
        return this.reviewService.getReviewsByAuthorId(authorId);
    }

    @Post('')
    getReviewsByTrainerId(@Body() data: Omit<TrainerReview, 'id'>) {
        return this.reviewService.createReview(data);
    }
}
