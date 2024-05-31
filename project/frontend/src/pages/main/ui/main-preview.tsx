import { Title, Box, Button, BackgroundImage, Center, Overlay, Stack } from '@mantine/core';

export const MainPreview = () => {
    return (
        <Box component='section' pos={'relative'}>
            <BackgroundImage h={'100vh'} src='./Hero.png'>
                <Overlay backgroundOpacity={0.4} zIndex={1} />
                <Center pos={'relative'} style={{ zIndex: 2 }} h={'100%'} px={'lg'}>
                    <Stack gap={100} align='center'>
                        <Title fw={900} fz={50} tt={'uppercase'} c={'white'} ta={'center'}>
                            Раскройте свой потенциал
                        </Title>

                        <Button component={'a'} href='#tariffs' variant='gradient' size='xl' radius={'xl'}>
                            Купить абонемент
                        </Button>
                    </Stack>
                </Center>
            </BackgroundImage>
        </Box>
    );
};
