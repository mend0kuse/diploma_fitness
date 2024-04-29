import { AppShell, Center } from '@mantine/core';
import { ReactNode } from 'react';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { AppShellMainProps } from '@mantine/core';

export const Layout = ({ children, ...mainProps }: { children: ReactNode } & AppShellMainProps) => {
    return (
        <AppShell footer={{ height: 60 }} header={{ height: 60 }} padding='xl'>
            <AppShell.Header>
                <Header />
            </AppShell.Header>

            <AppShell.Main px={'xl'} {...mainProps}>
                {children}
            </AppShell.Main>

            <AppShell.Footer>
                <Footer />
            </AppShell.Footer>
        </AppShell>
    );
};

export const CenteredLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Layout>
            <Center style={{ height: '100%' }}>{children}</Center>
        </Layout>
    );
};
