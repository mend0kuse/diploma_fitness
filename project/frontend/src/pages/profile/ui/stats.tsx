import { DonutChart, PieChart } from '@mantine/charts';
import { SimpleGrid, Stack, Text } from '@mantine/core';

export type TStats = {
    workouts: { label: string; value: number }[];
    attendance: {
        visited: number;
        missed: number;
        canceled: number;
    };
};

const colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

export const Stats = ({ stats }: { stats: TStats }) => {
    return (
        <SimpleGrid spacing='xl' cols={3}>
            <Stack align='center'>
                <Text ta={'center'}>Завершенные тренировки</Text>

                <PieChart
                    withTooltip
                    strokeWidth={2}
                    size={300}
                    data={stats?.workouts?.map((workout) => {
                        return {
                            name: workout.label,
                            value: workout.value,
                            color: colors[Math.floor(Math.random() * colors.length)],
                        };
                    })}
                />
            </Stack>
            <Stack align='center'>
                <Text ta={'center'}>Посещаемость</Text>

                <PieChart
                    size={300}
                    strokeWidth={2}
                    withTooltip
                    data={[
                        { name: 'Посещенные', value: stats?.attendance?.visited, color: 'blue' },
                        { name: 'Пропущенные', value: stats?.attendance?.missed, color: 'cyan' },
                        { name: 'Отмененные', value: stats?.attendance?.canceled, color: 'grape' },
                    ]}
                />
            </Stack>
        </SimpleGrid>
    );
};
