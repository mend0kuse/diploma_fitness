import { Badge, Group, Title, Text, Card, SimpleGrid, Container } from '@mantine/core';
import classes from './features.module.css';

const featuresData = [
    {
        title: 'Счастливых клиентов',
        description: '45k',
    },
    {
        title: 'Агентов в команде',
        description: '55',
    },
    {
        title: 'Лет на рынке',
        description: '25',
    },
];

export const FeaturesCards = () => {
    const features = featuresData.map((feature) => (
        <Card key={feature.title} shadow='md' radius='md' className={classes.card} padding='xl'>
            <Text className={classes.number} mt='sm'>
                {feature.description}
            </Text>
            <Text fz='lg' fw={500} className={classes.cardTitle} mt='md'>
                {feature.title}
            </Text>
        </Card>
    ));

    return (
        <Container size='lg' py='xl'>
            <Group justify='center'>
                <Badge variant='filled' size='lg'>
                    Лучшая компания
                </Badge>
            </Group>

            <Title order={2} className={classes.title} ta='center' mt='sm'>
                Разблокируйте потенциал недвижимости с нами!
            </Title>

            <Text c='dimmed' className={classes.description} ta='center' mt='md'>
                Качественное обслуживание, экспертное мнение и индивидуальный подход — мы поможем вам достичь ваших
                целей на рынке недвижимости
            </Text>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing='xl' mt={50}>
                {features}
            </SimpleGrid>
        </Container>
    );
};
