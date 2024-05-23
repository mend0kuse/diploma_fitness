import { TWorkout } from '@/entities/workout/workout-types';
import { dayjs } from '@/shared/lib/date/dayjs';
import { Anchor, Avatar, AvatarGroup, Button, Table, Text, Tooltip } from '@mantine/core';
import { useCompleteWorkout } from '../profile-hooks';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/routing/routes';

export const WorkoutsList = ({ workouts }: { workouts: TWorkout[] }) => {
    const { mutate, isPending } = useCompleteWorkout();

    return (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing='xs'>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Тренировка</Table.Th>
                        <Table.Th>Участники</Table.Th>
                        <Table.Th>Дата</Table.Th>
                        <Table.Th>Длительность</Table.Th>
                        <Table.Th>Статус</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {workouts.map(({ sportType, participants, dateStart, durationMinutes, id, status }) => {
                        return (
                            <Table.Tr key={id}>
                                <Table.Td>
                                    <Text>
                                        <Anchor component={Link} to={ROUTES.WORKOUT(id)}>
                                            {sportType}
                                        </Anchor>
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <AvatarGroup spacing={'sm'}>
                                        {participants.map((participant) => {
                                            return (
                                                <Tooltip
                                                    key={participant.id}
                                                    label={participant.profile?.name ?? participant.email}
                                                >
                                                    <Avatar
                                                        component={Link}
                                                        to={ROUTES.PROFILE(participant.id)}
                                                        size={'sm'}
                                                        src={participant.profile?.avatar}
                                                    />
                                                </Tooltip>
                                            );
                                        })}
                                    </AvatarGroup>
                                </Table.Td>
                                <Table.Td>
                                    <Text>{dayjs(dateStart).format('HH:mm - DD.MM.YYYY')}</Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text>{dayjs.duration(durationMinutes, 'minutes').humanize()}</Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text>{status === 'pending' ? 'Предстоящая' : 'Завершена'}</Text>
                                </Table.Td>
                                {status === 'pending' && (
                                    <Table.Td>
                                        <Button loading={isPending} onClick={() => mutate({ workoutId: id })}>
                                            Завершить
                                        </Button>
                                    </Table.Td>
                                )}
                            </Table.Tr>
                        );
                    })}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
};
