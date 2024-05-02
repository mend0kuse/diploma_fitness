import { Layout } from '@/layout';
import FullCalendar from '@fullcalendar/react';
import ruLocale from '@fullcalendar/core/locales/ru';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box } from '@mantine/core';

import classes from './schedule-page.module.css';

export const SchedulePage = () => {
    return (
        <Layout>
            <Box className={classes.schedulePage}>
                <FullCalendar
                    slotMinTime={'08:00:00'}
                    slotMaxTime={'21:00:00'}
                    headerToolbar={{
                        end: 'prev next',
                    }}
                    locale={ruLocale}
                    plugins={[timeGridPlugin]}
                    events={[
                        { title: 'event 1', date: '2024-05-01' },
                        { title: 'event 2', date: '2024-05-02' },
                    ]}
                />
            </Box>
        </Layout>
    );
};
