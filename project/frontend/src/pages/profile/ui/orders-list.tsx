import { ORDER_STATUS_COLOR, ORDER_STATUS_TEXT, TOrder } from '@/entities/order/order-types';
import { dayjs } from '@/shared/lib/date/dayjs';
import { ROUTES } from '@/shared/routing/routes';
import { Anchor, Avatar, Table, Text, Tooltip } from '@mantine/core';
import { Link } from 'react-router-dom';

export const OrdersList = ({ orders }: { orders: TOrder[] }) => {
    return (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing='xs'>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Тренировка</Table.Th>
                        <Table.Th>Тренер</Table.Th>
                        <Table.Th>Дата</Table.Th>
                        <Table.Th>Длительность</Table.Th>
                        <Table.Th>Статус</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {orders.map(({ status, id, workout }) => {
                        if (!workout) {
                            return null;
                        }

                        return (
                            <Table.Tr key={id}>
                                <Table.Td>
                                    <Anchor to={ROUTES.WORKOUT(workout.id)} component={Link}>
                                        {workout.sportType}
                                    </Anchor>
                                </Table.Td>
                                <Table.Td>
                                    <Tooltip label={workout.trainer.profile.name ?? workout.trainer.email}>
                                        <Avatar
                                            component={Link}
                                            to={ROUTES.PROFILE(workout.trainer.id)}
                                            src={workout.trainer.profile.avatar}
                                        />
                                    </Tooltip>
                                </Table.Td>
                                <Table.Td>
                                    <Text>{dayjs(workout.dateStart).format('HH:mm - DD.MM.YYYY')}</Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text>{dayjs.duration(workout.durationMinutes, 'minutes').format('HHч:mmм')}</Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text c={ORDER_STATUS_COLOR[status]}>{ORDER_STATUS_TEXT[status]}</Text>
                                </Table.Td>
                            </Table.Tr>
                        );
                    })}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
};
