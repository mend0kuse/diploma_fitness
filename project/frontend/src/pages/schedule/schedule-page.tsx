import { CenteredLayout, Layout } from '@/layout';
import { Button, Container, LoadingOverlay, Modal, Stack, Text, Title } from '@mantine/core';
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
import { observer } from 'mobx-react-lite';

export type TFilters = {
    dateStart: Date | null;
    dateEnd: Date | null;
    trainerId: string | null;
    type: string | null;
    hasAvailablePlaces: boolean;
};

export const SchedulePage = observer(() => {
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
            const truthyFilters = pickBy(filters, Boolean);

            const response = await $api.get<TWorkout[]>(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                `${API_ENDPOINTS.WORKOUT}?${new URLSearchParams(truthyFilters).toString()}`
            );

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

    return (
        <Layout>
            <Container size={'xl'} pos={'relative'}>
                <LoadingOverlay
                    visible={isLoading || isFetching || isLoadingTrainers}
                    zIndex={1000}
                    overlayProps={{ radius: 'sm', blur: 2 }}
                />

                <Filters trainers={trainers ?? []} filters={filters} setFilters={setFilters} />

                <Button mt={10} mb={30} onClick={() => refetch()}>
                    Применить фильтры
                </Button>

                <ScheduleCalendar events={data} onModalOpen={onModalOpen} />

                <Modal centered opened={opened && !!selectedWorkoutInfo} onClose={close} title='Тренировка'>
                    <Stack>
                        <Title>{selectedWorkoutInfo?.title}</Title>
                        <Text>{selectedWorkoutInfo?.sportType}</Text>
                        <Button component={Link} to={ROUTES.WORKOUT(selectedWorkoutInfo?.id)}>
                            Подробнее
                        </Button>
                    </Stack>
                </Modal>
            </Container>
        </Layout>
    );
});
