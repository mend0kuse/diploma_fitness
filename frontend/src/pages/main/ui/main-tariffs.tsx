import { useCreatePayment } from '@/entities/payment/payment-hooks';
import { user } from '@/entities/user';
import { ROUTES } from '@/shared/routing/routes';
import { Card, Button, Container, Title, SegmentedControl, Stack, List, ThemeIcon, Text, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const TICKETS = [
    {
        id: '1',
        description: '1 месяц',
        price: '5000 ₽',
        months: 1,
    },
    {
        id: '2',
        description: '6 месяцев',
        price: '25000 ₽',
        months: 6,
    },
    {
        id: '3',
        description: 'Год',
        price: '45000 ₽',
        months: 12,
    },
];

export const MainTariffs = observer(() => {
    const [selectedTicket, setSelectedTicket] = useState('1');
    const [isVisibleAuthorize, setIsVisibleAuthorize] = useState(false);

    const { isPending, mutate } = useCreatePayment();

    const handleBuy = () => {
        if (!user.isAuthorized) {
            notifications.show({
                title: 'Вы не авторизованы',
                message: 'Для покупки абонемента необходимо авторизоваться',
                color: 'red',
                withCloseButton: true,
                autoClose: 5000,
            });

            setIsVisibleAuthorize(true);

            return;
        }

        setIsVisibleAuthorize(false);
        mutate({ ticketId: Number(selectedTicket) });
    };

    return (
        <Container component='section' id='tariffs'>
            <Title ta={'center'} mb={'lg'}>
                Абонемент
            </Title>

            <Card p={0} withBorder radius='md'>
                <Stack gap={20} p={'lg'} align='center'>
                    <List
                        styles={{ itemLabel: { lineHeight: 1.4 } }}
                        spacing='xs'
                        size='sm'
                        center
                        icon={
                            <ThemeIcon color='teal' size={24} radius='xl'>
                                <AiFillCheckCircle />
                            </ThemeIcon>
                        }
                    >
                        <List.Item>
                            Гибкость Расписания: Возможность выбирать время для тренировок, удобное для вашего
                            расписания.
                        </List.Item>
                        <List.Item>Систематичность: Наличие абонемента стимулирует регулярные тренировки.</List.Item>
                        <List.Item>
                            Повышение Здоровья и Физической Формы: Регулярные физические нагрузки улучшают общее
                            состояние здоровья, способствуют похудению и укреплению мышц.
                        </List.Item>
                        <List.Item>
                            Мотивация и Социализация: Возможность тренироваться в компании единомышленников.
                        </List.Item>
                        <List.Item>Дополнительные Услуги: Доступ к сауне, бассейну, спа и другим удобствам.</List.Item>
                    </List>

                    {user.hasAccessToTraining && user.expiredTicketDate ? (
                        <Text fz={25} fw={800}>
                            Ваш абонемент закончится {new Date(user.expiredTicketDate).toLocaleDateString()}
                        </Text>
                    ) : (
                        <>
                            <SegmentedControl
                                value={selectedTicket}
                                onChange={setSelectedTicket}
                                w={500}
                                data={TICKETS.map((ticket) => {
                                    return {
                                        label: ticket.description,
                                        value: ticket.id.toString(),
                                    };
                                })}
                            />

                            <Group>
                                <Text fz={25} fw={900}>
                                    {TICKETS.find((ticket) => ticket.id === selectedTicket)?.price ?? ''}
                                </Text>

                                <Button loading={isPending} onClick={handleBuy} size='lg' radius='md'>
                                    Купить
                                </Button>
                            </Group>
                        </>
                    )}

                    {isVisibleAuthorize && (
                        <Button size='xl' to={ROUTES.AUTHORIZATION} variant='light' component={Link}>
                            Пройти авторизацию
                        </Button>
                    )}
                </Stack>
            </Card>
        </Container>
    );
});
