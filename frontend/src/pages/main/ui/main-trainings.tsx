import { BackgroundImage, Box, Card, Grid, SimpleGrid, Title, Text, Overlay, CardProps } from '@mantine/core';

export function MainTrainings() {
    return (
        <Box px={50} component='section'>
            <Title ta={'center'} mb={'lg'}>
                Виды тренировок
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
                <TrainingCard
                    h={615}
                    text='Йога'
                    src='https://blog.ciaathletica.com.br/wp-content/uploads/2018/07/yoga-5-beneficios-que-v%C3%A3o-mudar-a-sua-vida-1.jpg'
                />

                <Grid gutter='md'>
                    <Grid.Col>
                        <TrainingCard
                            h={300}
                            text='Пилатес'
                            src='https://avon-c.ru/wp-content/uploads/0/2/7/027f33dc25c968d4ddfa4e4c81a3a165.jpeg'
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TrainingCard
                            h={300}
                            text='Кроссфит'
                            src='https://i.pinimg.com/originals/37/15/e2/3715e2a3cada6d06249afb886f7432b7.jpg'
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TrainingCard
                            h={300}
                            text='Бокс'
                            src='https://sportishka.com/uploads/posts/2022-11/1667498427_23-sportishka-com-p-trenirovka-boksera-vkontakte-24.jpg'
                        />
                    </Grid.Col>
                </Grid>
            </SimpleGrid>
        </Box>
    );
}

function TrainingCard({ src, text, ...cardProps }: { src: string; text: string } & CardProps) {
    return (
        <Card p={0} radius='md' pos={'relative'} {...cardProps}>
            <BackgroundImage pos={'absolute'} h={'100%'} src={src} />
            <Overlay zIndex={1} backgroundOpacity={0.5} />

            <Text
                tt={'uppercase'}
                style={{ zIndex: 2 }}
                c={'white'}
                left={15}
                bottom={15}
                pos={'absolute'}
                fz={25}
                fw={800}
            >
                {text}
            </Text>
        </Card>
    );
}
