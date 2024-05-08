import React from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './app';
import { DatesProvider } from '@mantine/dates';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import './styles/index.css';
import { Notifications } from '@mantine/notifications';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

const domNode = document.getElementById('root');

if (!domNode) {
    throw new Error('Root container not found');
}

const root = createRoot(domNode);

const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'cyan',
});

const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <DatesProvider
                    settings={{ locale: 'ru', firstDayOfWeek: 0, weekendDays: [0], timezone: 'Asia/Irkutsk' }}
                >
                    <Notifications />
                    <App />
                </DatesProvider>
            </QueryClientProvider>
        </MantineProvider>
    </React.StrictMode>
);

/**
 * TODO:
 *
 * Workout
 * @maybe share socials
 *
 * Schedule
 * - css for library
 */
