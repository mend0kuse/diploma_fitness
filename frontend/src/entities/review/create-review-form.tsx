import { Box, Paper, Rating, Stack, Switch, Textarea, Text, LoadingOverlay, Button } from '@mantine/core';
import { TReview, TReviewCreate } from './review-types';
import { useForm } from '@mantine/form';
import { useCreateReview } from './useCreateReview';
import { user } from '../user';
import { observer } from 'mobx-react-lite';

export const CreateReviewForm = observer(
    ({ onCreate, userId }: { onCreate?: (data: TReview) => void; userId: number }) => {
        const { mutate, isPending } = useCreateReview({ onSuccess: onCreate });

        const form = useForm<TReviewCreate>({
            initialValues: {
                rating: 4,
                text: '',
                userId,
                authorId: user.id ?? -1,
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
                    <LoadingOverlay visible={isPending} zIndex={1} overlayProps={{ radius: 'sm', blur: 2 }} />
                    <Stack align='start'>
                        <Box>
                            <Text>Оценка</Text>
                            <Rating fractions={2} {...form.getInputProps('rating')} />
                        </Box>
                        <Textarea miw={300} label='Ваш отзыв' placeholder='...' {...form.getInputProps('text')} />
                        <Switch label='Скрыть мое имя в отзыве' {...form.getInputProps('isHiddenUser')} />
                        <Button type='submit'>Отправить</Button>
                    </Stack>
                </Paper>
            </form>
        );
    }
);
