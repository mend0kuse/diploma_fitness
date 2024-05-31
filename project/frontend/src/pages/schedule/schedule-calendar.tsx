import { EventSourceInput } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import { Box, Group, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { useRef, LegacyRef, memo } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ruLocale from '@fullcalendar/core/locales/ru';
import { EventImpl } from '@fullcalendar/core/internal';

export const ScheduleCalendar = memo(
    ({ events, onModalOpen }: { events: EventSourceInput | undefined; onModalOpen: (event: EventImpl) => void }) => {
        const calendarRef = useRef() as LegacyRef<FullCalendar>;

        return (
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
                events={events ?? []}
                eventContent={({ event }) => {
                    const info = event.extendedProps.info;
                    const availablePlaces = info.availablePlaces;

                    return (
                        <Box c={'white'} bg={event.extendedProps.mainColor} p={5} h='100%' w='100%'>
                            <Group justify={'space-between'}>
                                <Text fz={10}>{dayjs(event.start).format('HH:mm')}</Text>
                                <Text fz={10}>{dayjs.duration(info.durationMinutes, 'minutes').format('HHч:mmм')}</Text>
                            </Group>

                            <Text fw={800} fz={10}>
                                {event.title}
                            </Text>

                            {availablePlaces > 0 ? (
                                <Text fz={10}>Места - {availablePlaces}</Text>
                            ) : (
                                <Text>Мест нет</Text>
                            )}
                        </Box>
                    );
                }}
            />
        );
    }
);

ScheduleCalendar.displayName = 'ScheduleCalendar';
