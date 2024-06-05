import { TReview } from '@/entities/review/review-types';
import { Carousel } from '@mantine/carousel';
import { Avatar, Card, Group, Rating, Stack, Text } from '@mantine/core';

export const ReviewsList = ({ reviews }: { reviews: TReview[] }) => {
    return (
        <Carousel px={'xl'} slideSize='33.333333%' slideGap='md' slidesToScroll={3}>
            {reviews.map(({ author, isHiddenUser, rating, text, id }) => (
                <Carousel.Slide key={id}>
                    <Card radius='md' withBorder shadow='xs' p={'md'}>
                        <Stack>
                            <Rating fractions={2} readOnly value={rating} />

                            {isHiddenUser ? (
                                <Text size='xs'>Анонимный отзыв</Text>
                            ) : (
                                <Group>
                                    <Avatar src={author.profile.avatar} />
                                    <Text size='lg'>{author.profile.name ?? author.email}</Text>
                                </Group>
                            )}

                            <Text size='md'>{text}</Text>
                        </Stack>
                    </Card>
                </Carousel.Slide>
            ))}
        </Carousel>
    );
};
