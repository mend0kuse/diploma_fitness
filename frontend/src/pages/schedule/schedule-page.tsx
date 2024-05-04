import { CenteredLayout, Layout } from '@/layout';
import FullCalendar from '@fullcalendar/react';
import ruLocale from '@fullcalendar/core/locales/ru';
import { Box, Button, Group, LoadingOverlay, Modal, Text } from '@mantine/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import classes from './schedule-page.module.css';
import { useGetWorkouts } from '@/pages/schedule/useGetWorkouts';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';
import { dayjs } from '@/shared/lib/date/dayjs';
import { LegacyRef, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/routing/routes';
import { useDisclosure } from '@mantine/hooks';
import { EventImpl } from '@fullcalendar/core/internal';

export const SchedulePage = () => {
    const { data, isLoading, error, isError } = useGetWorkouts();

    const calendarRef = useRef() as LegacyRef<FullCalendar>;
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedWorkout, setSelectedWorkout] = useState<EventImpl | null>(null);

    const seletedWorkoutInfo = selectedWorkout ? selectedWorkout.extendedProps.info : null;

    if (isError) {
        return (
            <CenteredLayout>
                <Text c='red'>{transformAxiosError(error)}</Text>
            </CenteredLayout>
        );
    }

    const onModalOpen = (evt: EventImpl) => {
        open();
        setSelectedWorkout(evt);
    };

    const isShowManagement = true; // TODO: trainer

    return (
        <Layout>
            <Box pos={'relative'} className={classes.schedulePage}>
                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />

                {isShowManagement && (
                    <Group>
                        <Button component={Link} to={ROUTES.CREATE_WORKOUT}>
                            Создать тренировку
                        </Button>
                    </Group>
                )}

                <FullCalendar
                    ref={calendarRef}
                    eventClick={(e) => onModalOpen(e.event)}
                    headerToolbar={{
                        end: 'prev next',
                        center: 'dayGridWeek dayGridDay',
                    }}
                    initialView={'dayGridWeek'}
                    locale={ruLocale}
                    plugins={[dayGridPlugin]}
                    events={data ?? []}
                    eventContent={({ event }) => {
                        // TODO: layout
                        // TODO: colorScheme for events

                        return (
                            <Box c={'white'} bg={event.extendedProps.mainColor} p={5} h='100%' w='100%'>
                                <Group justify={'space-between'}>
                                    <Text fz={10}>{dayjs(event.start).format('HH:mm')}</Text>
                                    <Text fz={10}>
                                        {dayjs
                                            .duration(event.extendedProps.info.durationMinutes, 'minutes')
                                            .format('HHч:mmм')}
                                    </Text>
                                </Group>

                                <Text fw={800} fz={10}>
                                    {event.title}
                                </Text>

                                {event.extendedProps.info.availablePlaces > 0 ? (
                                    <Text fz={10}>Места - {event.extendedProps.info.availablePlaces}</Text>
                                ) : (
                                    <Text>Мест нет</Text>
                                )}
                            </Box>
                        );
                    }}
                />

                <Modal opened={opened && !!seletedWorkoutInfo} onClose={close} title='Тренировка'>
                    {/** TODO: layout/styles */}
                    <Text>{seletedWorkoutInfo?.title}</Text>
                    <Text>{seletedWorkoutInfo?.sportType}</Text>
                    <Text>{seletedWorkoutInfo?.description}</Text>
                    <Button component={Link} to={ROUTES.WORKOUT(seletedWorkoutInfo?.id)}>
                        Подробнее
                    </Button>
                </Modal>
            </Box>
        </Layout>
    );
};
