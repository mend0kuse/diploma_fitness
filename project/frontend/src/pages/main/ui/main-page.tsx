import { Layout } from '@/layout';
import { MainPreview } from './main-preview';
import { FaqSimple } from './main-faq';
import { Stack } from '@mantine/core';
import { MainTrainings } from './main-trainings';
import { MainTariffs } from './main-tariffs';

export const MainPage = () => {
    return (
        <Layout isHeaderInverted py={0}>
            <Stack gap={100}>
                <MainPreview />
                <MainTrainings />
                <FaqSimple />
                <MainTariffs />
            </Stack>
        </Layout>
    );
};
