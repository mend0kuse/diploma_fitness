import { Center, AppShellMainProps, Box, Group, ActionIcon, rem, Divider, Stack } from '@mantine/core';
import { ReactNode } from 'react';
import { Header } from '@/widgets/header/header';
import { AppLogo } from '@/shared/ui/logo';
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai';

export const Layout = ({
    children,
    isHeaderInverted,
    ...mainProps
}: { children: ReactNode; isHeaderInverted?: boolean } & AppShellMainProps) => {
    return (
        <Stack h={'100%'}>
            <Box w={'100%'} style={{ zIndex: 1000 }} pos={'absolute'} component='header'>
                <Header inverted={!!isHeaderInverted} />
            </Box>

            <Box style={{ flexGrow: 1 }} py={120} mb={100} component='main' {...mainProps}>
                {children}
            </Box>

            <Box>
                <Divider />
                <Group justify='space-between' py='xs' px={'xl'}>
                    <AppLogo />

                    <Group gap='xs' justify='flex-end' wrap='nowrap'>
                        <ActionIcon size='lg' variant='default' radius='xl'>
                            <AiFillTwitterCircle style={{ width: rem(18), height: rem(18) }} />
                        </ActionIcon>
                        <ActionIcon size='lg' variant='default' radius='xl'>
                            <AiFillYoutube style={{ width: rem(18), height: rem(18) }} />
                        </ActionIcon>
                        <ActionIcon size='lg' variant='default' radius='xl'>
                            <AiFillInstagram style={{ width: rem(18), height: rem(18) }} />
                        </ActionIcon>
                    </Group>
                </Group>
            </Box>
        </Stack>
    );
};

export const CenteredLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Layout>
            <Center style={{ height: '100%' }}>{children}</Center>
        </Layout>
    );
};
