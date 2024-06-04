import { CenteredLayout, Layout } from '@/layout';
import { useGetWorkoutById } from '@/pages/workout/lib/useGetWorkout';
import { Avatar, AvatarGroup, Box, Button, Container, Group, Loader, Stack, Text, Title, Tooltip } from '@mantine/core';
import { Error } from '@/shared/ui/error/error';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';
import { ProfileCard } from '@/pages/profile/ui/profile-card';
import { dayjs } from '@/shared/lib/date/dayjs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { observer } from 'mobx-react-lite';
import { user } from '@/entities/user';
import { Link, useParams } from 'react-router-dom';
import { useCreateOrder } from '@/pages/workout/lib/useCreateOrder';
import { useCancelOrder } from './lib/useCancelOrder';
import { notifications } from '@mantine/notifications';
import { ROUTES } from '@/shared/routing/routes';
import { useCancelWorkout } from './lib/useCancelWorkout';

export const WorkoutPage = observer(() => {
    const { id } = useParams<{ id: string }>();

    const { data: workout, isError, refetch, isLoading, error } = useGetWorkoutById(id);
    const { mutate: createOrderMutation, isPending: isCreatePending } = useCreateOrder(id);

    const { mutate: cancelOrderMutation, isPending: isCancelPending } = useCancelOrder();
    const { mutate: cancelWorkoutMutation, isPending: isEditPending } = useCancelWorkout(id);

    if (isLoading) {
        return (
            <CenteredLayout>
                <Loader />
            </CenteredLayout>
        );
    }

    if (isError || !workout) {
        return (
            <CenteredLayout>
                <Error message={error ? transformAxiosError(error) : undefined} onTryAgain={refetch} />
            </CenteredLayout>
        );
    }

    const userOrder = workout.orders.find((order) => order.client.id === user.id);
    const isUserParticipant = !!userOrder && userOrder?.status !== 'CANCELLED';

    const isPending = workout.status === 'pending';
    const isCanceled = workout.status === 'canceled';

    const availablePlaces = workout.maxPlaces - workout.participants.length;

    const createOrder = () => {
        if (!user.hasAccessToTraining) {
            notifications.show({
                withCloseButton: true,
                autoClose: 5000,
                color: 'red',
                title: 'Нет доступа.',
                message: 'Нет доступа. Купите абонемент или дождитесь окончания заморозки',
            });

            return;
        }

        createOrderMutation();
    };

    const cancelOrder = () => {
        userOrder && cancelOrderMutation(userOrder.id.toString());
    };

    function cancelWorkout(): void {
        cancelWorkoutMutation();
    }

    return (
        <Layout>
            <Container size={'xl'}>
                <Group align={'start'}>
                    <Stack>
                        <ProfileCard user={workout.trainer} />
                    </Stack>
                    <Stack>
                        {isCanceled && <Title c='red'>Отменено</Title>}
                        <Title>
                            {workout.sportType} - {workout.title}
                        </Title>
                        <Box>
                            <Group align={'center'}>
                                <AiOutlineClockCircle />
                                <Stack gap={1}>
                                    <Text>{dayjs(workout.dateStart).format('DD MMMM · HH:mm')}· </Text>
                                    <Text>{dayjs.duration(workout.durationMinutes, 'minutes').format('HHч:mmм')}</Text>
                                </Stack>
                            </Group>
                        </Box>

                        {isPending && <Text>Свободные места - {availablePlaces}</Text>}

                        {!isCanceled && (
                            <Stack gap={5}>
                                <Title order={3}>Участники</Title>
                                <AvatarGroup>
                                    {workout.participants.length === 0 && <Text>Никого нет</Text>}
                                    {workout.participants.map((participant) => {
                                        return (
                                            <Tooltip
                                                key={participant.id}
                                                label={participant.profile?.name ?? participant.email}
                                            >
                                                <Avatar
                                                    component={Link}
                                                    to={ROUTES.PROFILE(participant.id)}
                                                    src={participant.profile?.avatar}
                                                />
                                            </Tooltip>
                                        );
                                    })}
                                </AvatarGroup>
                            </Stack>
                        )}

                        {user.isClient && workout.status === 'pending' && (
                            <>
                                {isUserParticipant ? (
                                    <Button color='red' loading={isCancelPending} onClick={cancelOrder}>
                                        Отменить запись
                                    </Button>
                                ) : (
                                    <>
                                        {availablePlaces > 0 && user.isClient && (
                                            <Button loading={isCreatePending} onClick={createOrder}>
                                                Записаться
                                            </Button>
                                        )}
                                    </>
                                )}
                            </>
                        )}

                        {user.isAdmin && workout.status === 'pending' && (
                            <Stack>
                                <Title>Управление тренировкой</Title>
                                <Button to={ROUTES.EDIT_WORKOUT(workout.id)} component={Link}>
                                    Редактировать
                                </Button>

                                <Button color='red' loading={isEditPending} onClick={cancelWorkout}>
                                    Отменить
                                </Button>
                            </Stack>
                        )}
                    </Stack>
                </Group>
            </Container>
        </Layout>
    );
});
