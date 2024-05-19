import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider, createTheme } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { Notifications } from '@mantine/notifications';

import { App } from './app';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import './styles/index.css';

const domNode = document.getElementById('root');

if (!domNode) {
    throw new Error('Root container not found');
}

const root = createRoot(domNode);

const theme = createTheme({
    primaryColor: 'cyan',
});

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 2, retryOnMount: false } } });

root.render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <DatesProvider
                    settings={{ locale: 'ru', firstDayOfWeek: 0, weekendDays: [0], timezone: 'Asia/Irkutsk' }}
                >
                    <App />
                    <Notifications />
                </DatesProvider>
            </QueryClientProvider>
        </MantineProvider>
    </React.StrictMode>
);
