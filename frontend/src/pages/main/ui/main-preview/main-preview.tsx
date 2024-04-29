import { Title, Text, Box, BackgroundImage, Center, Overlay } from '@mantine/core';
import classes from './main-preview.module.css';
export const MainPreview = () => (
    <Box pos={'relative'}>
        <BackgroundImage src='./preview.png' radius='sm'>
            <Overlay zIndex={0} color='#000' backgroundOpacity={0.5} />
            <Center px={'lg'} className={classes.container}>
                <Title className={classes.title}>Первоклассные жилье для вашего идеального образа жизни</Title>
                <Text className={classes.description} size='xl' mt='xl'>
                    Откройте двери к вашей мечте с нашим агентством недвижимости
                </Text>
            </Center>
        </BackgroundImage>
    </Box>
);
