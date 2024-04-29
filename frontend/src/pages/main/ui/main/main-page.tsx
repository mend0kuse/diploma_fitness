import { Layout } from '@/layout';
import { MainPreview } from '../main-preview/main-preview';
import { Contacts } from '../contacts/contacts';
import { FeaturesCards } from '../features/features';
export const MainPage = () => {
    return (
        <Layout>
            <MainPreview />
            <Contacts />
            <FeaturesCards />
        </Layout>
    );
};
