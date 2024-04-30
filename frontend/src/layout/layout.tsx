import { AppShell, Center, AppShellMainProps } from '@mantine/core';
import { ReactNode } from 'react';
import { Navbar } from '@/widgets/navbar/navbar';

export const Layout = ({ children, ...mainProps }: { children: ReactNode } & AppShellMainProps) => {
    return (
        <AppShell>
            <AppShell.Navbar>
                <Navbar />
            </AppShell.Navbar>

            <AppShell.Main px={100} py={20} {...mainProps}>
                {children}
            </AppShell.Main>
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
