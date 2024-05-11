import { Avatar, Text, Button, Paper, LoadingOverlay, Modal, Rating, Center, Stack } from '@mantine/core';
import { TUser, user as userStore } from '@/entities/user';
import { observer } from 'mobx-react-lite';
import { useCreateChat } from '../profile-hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/routing/routes';
import { useDisclosure } from '@mantine/hooks';
import { CreateReviewForm } from '@/entities/review/create-review-form';
import _ from 'lodash';

export const ProfileCard = observer(({ user: { profile, email, role, id, myReviews } }: { user: TUser }) => {
    const isOwnProfile = userStore.id === id;
    const router = useNavigate();

    const redirectToChat = (chatId: number) => {
        if (!userStore.id) {
            return;
        }

        router(`${ROUTES.PROFILE(userStore.id)}?chatId=${chatId}`);
    };

    const [isModalOpened, { close, open }] = useDisclosure(false);

    const { createChat, isPending } = useCreateChat({ onSuccess: redirectToChat });

    const rating = _.meanBy(myReviews, (review) => review.rating);

    const isTrainerProfile = role === 'trainer';

    return (
        <>
            <Paper ta={'center'} pos={'relative'} radius='md' withBorder p='lg' bg='var(--mantine-color-body)'>
                <Stack gap={2}>
                    <LoadingOverlay visible={isPending} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />

                    <Avatar src={profile.avatar} size={120} radius={120} mx='auto' />

                    {profile.name && (
                        <Text fz='lg' fw={500} mt='md'>
                            {profile.name}
                        </Text>
                    )}

                    <Text c='dimmed' fz='sm'>
                        {email} • {role === 'user' ? 'Спортсмен' : 'Тренер'}
                    </Text>

                    {profile.status && <Text>{profile.status}</Text>}

                    {myReviews?.length && (
                        <Center>
                            <Rating readOnly defaultValue={rating} fractions={3} />
                        </Center>
                    )}

                    {!isOwnProfile && userStore.isAuthorized && userStore.id && (
                        <Button
                            onClick={() => createChat({ userIds: [id, userStore.id ?? -1] })}
                            variant='default'
                            fullWidth
                            mt='md'
                        >
                            Написать
                        </Button>
                    )}

                    {isTrainerProfile && !isOwnProfile && userStore.isAuthorized && (
                        <Button onClick={open} variant='default' fullWidth mt='md'>
                            Написать отзыв
                        </Button>
                    )}

                    <Modal opened={isModalOpened} onClose={close}>
                        <CreateReviewForm userId={id} onCreate={close} />
                    </Modal>
                </Stack>
            </Paper>
        </>
    );
});
