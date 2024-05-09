import { Box, Paper, Rating, Stack, Switch, Textarea, Text, LoadingOverlay, Button } from '@mantine/core';
import { TReview, TReviewCreate } from './review-types';
import { useForm } from '@mantine/form';
import { useCreateReview } from './useCreateReview';

export const CreateReviewForm = ({ onCreate, userId }: { onCreate?: (data: TReview) => void; userId: number }) => {
    const { mutate, isPending } = useCreateReview({ onSuccess: onCreate });

    const form = useForm<TReviewCreate>({
        initialValues: {
            rating: 4,
            text: '',
            userId,
            isHiddenUser: false,
        },

        validate: {
            text: (value) => (value.length > 0 ? null : 'Invalid text'),
            rating: (value) => (value > 0 ? null : 'Invalid rating'),
        },
    });

    return (
        <form onSubmit={form.onSubmit((values) => mutate(values))}>
            <Paper pos={'relative'}>
                <LoadingOverlay visible={isPending} />
                <Stack>
                    <Switch label='Скрыть мое имя в отзыве' {...form.getInputProps('isHiddenUser')} />
                    <Textarea label='Ваш отзыв' placeholder='...' {...form.getInputProps('text')} />
                    <Box>
                        <Text>Поставьте оценку</Text>
                        <Rating fractions={2} {...form.getInputProps('rating')} />
                    </Box>
                </Stack>
                <Button type='submit'>Отправить</Button>
            </Paper>
        </form>
    );
};
