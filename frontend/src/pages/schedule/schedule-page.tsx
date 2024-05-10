import { CenteredLayout, Layout } from '@/layout';
import { Button, Container, Group, LoadingOverlay, Modal, Text } from '@mantine/core';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/routing/routes';
import { useDisclosure } from '@mantine/hooks';
import { EventImpl } from '@fullcalendar/core/internal';
import { Filters } from './filters';
import { ScheduleCalendar } from './schedule-calendar';
import { useGetTrainers } from './useGetTrainers';
import { TWorkout } from '@/entities/workout/workout-types';
import { $api } from '@/shared/api/api';
import { QUERY_KEYS, API_ENDPOINTS } from '@/shared/api/config';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { pickBy } from 'lodash';
import { Error } from '@/shared/ui/error/error';

export type TFilters = {
    dateStart: Date | null;
    dateEnd: Date | null;
    trainerId: string | null;
    type: string | null;
    hasAvailablePlaces: boolean;
};

export const SchedulePage = () => {
    const [filters, setFilters] = useState<TFilters>(() => {
        return {
            dateStart: null,
            dateEnd: null,
            trainerId: null,
            type: null,
            hasAvailablePlaces: false,
        };
    });

    const { data, isLoading, isFetching, error, isError, refetch } = useQuery({
        queryKey: [QUERY_KEYS.WORKOUT],
        enabled: false,
        queryFn: async () => {
            const truthy = pickBy(filters, Boolean);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const searchParams = new URLSearchParams(truthy);

            const response = await $api.get<TWorkout[]>(`${API_ENDPOINTS.WORKOUT}?${searchParams.toString()}`);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result: any[] = [];

            response.data.forEach(
                ({
                    durationMinutes,
                    dateStart,
                    maxPlaces,
                    participants,
                    id,
                    sportType,
                    title,
                    description,
                    orders,
                    trainer,
                }) => {
                    const isFuture = new Date(dateStart) > new Date();

                    if (!isFuture) {
                        return;
                    }

                    const availablePlaces = maxPlaces - (participants?.length ?? 0);
                    const isActive = !!availablePlaces;

                    const mainColor = isActive ? '#15aabf' : '#15aabfcf';

                    result.push({
                        id: id.toString(),
                        title: sportType,
                        start: dateStart,
                        end: dayjs(dateStart).add(durationMinutes, 'minutes').toDate(),
                        textColor: isActive ? 'white' : '#ffffff6b',
                        mainColor,
                        info: {
                            id,
                            availablePlaces,
                            durationMinutes,
                            title,
                            sportType,
                            maxPlaces,
                            description,
                            orders,
                            trainer,
                        },
                    });
                }
            );

            return result;
        },
    });

    const { data: trainers, isLoading: isLoadingTrainers } = useGetTrainers();

    const [opened, { open, close }] = useDisclosure(false);
    const [selectedWorkout, setSelectedWorkout] = useState<EventImpl | null>(null);

    const selectedWorkoutInfo = selectedWorkout ? selectedWorkout.extendedProps.info : null;

    const onModalOpen = useCallback((evt: EventImpl) => {
        open();
        setSelectedWorkout(evt);
    }, []);

    useEffect(() => {
        refetch();
    }, []);

    if (isError) {
        return (
            <CenteredLayout>
                <Error onTryAgain={refetch} message={transformAxiosError(error)} />
            </CenteredLayout>
        );
    }

    const isShowManagement = true; // TODO: isTrainer

    return (
        <Layout>
            <Container size={'xl'} pos={'relative'}>
                <LoadingOverlay
                    visible={isLoading || isFetching || isLoadingTrainers}
                    zIndex={1000}
                    overlayProps={{ radius: 'sm', blur: 2 }}
                />

                <Filters trainers={trainers ?? []} filters={filters} setFilters={setFilters} />
                <Button mt={20} onClick={() => refetch()}>
                    Применить фильтры
                </Button>

                {isShowManagement && (
                    <Group>
                        <Button component={Link} to={ROUTES.CREATE_WORKOUT}>
                            Создать тренировку
                        </Button>
                    </Group>
                )}

                <ScheduleCalendar events={data} onModalOpen={onModalOpen} />

                <Modal opened={opened && !!selectedWorkoutInfo} onClose={close} title='Тренировка'>
                    {/** TODO: layout/styles */}
                    <Text>{selectedWorkoutInfo?.title}</Text>
                    <Text>{selectedWorkoutInfo?.sportType}</Text>
                    <Text>{selectedWorkoutInfo?.description}</Text>
                    <Button component={Link} to={ROUTES.WORKOUT(selectedWorkoutInfo?.id)}>
                        Подробнее
                    </Button>
                </Modal>
            </Container>
        </Layout>
    );
};
