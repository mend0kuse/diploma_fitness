import { WORKOUT_TYPE } from '@/entities/workout/workout-types';
import { Group, Select, Switch } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { TFilters } from './schedule-page';
import React from 'react';
import { TUser } from '@/entities/user';

export const Filters = ({
    setFilters,
    filters,
    trainers,
}: {
    filters: TFilters;
    trainers: TUser[];
    setFilters: React.Dispatch<React.SetStateAction<TFilters>>;
}) => {
    return (
        <Group>
            <Switch
                onChange={(event) =>
                    setFilters((prev) => ({ ...prev, hasAvailablePlaces: event.currentTarget.checked }))
                }
                checked={filters.hasAvailablePlaces}
                label='Есть свободные места'
            />
            <Select
                onChange={(type) => setFilters((prev) => ({ ...prev, type }))}
                label='Тип тренировки'
                value={filters.type}
                data={Object.values(WORKOUT_TYPE)}
            />
            <Select
                value={filters.trainerId}
                placeholder='Выберите тренера'
                label='Тренер'
                data={
                    trainers?.map((trainer) => {
                        return { label: trainer.email, value: trainer.id.toString() };
                    }) ?? []
                }
                onChange={(trainerId) => {
                    setFilters((prev) => ({ ...prev, trainerId }));
                }}
            />
            <DatePickerInput
                miw={200}
                type='range'
                label='Диапазон дат'
                value={[filters.dateStart, filters.dateEnd]}
                onChange={(dates) => {
                    setFilters((prev) => ({ ...prev, dateStart: dates[0], dateEnd: dates[1] }));
                }}
            />
        </Group>
    );
};
