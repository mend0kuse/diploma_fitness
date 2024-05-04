import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/api/config';
import { $api } from '@/shared/api/api';
import { TWorkout } from '@/entities/workout/workout-types';
import { dayjs } from '@/shared/lib/date/dayjs';

export const useGetWorkouts = () => {
    return useQuery({
        queryFn: async () => {
            const response = await $api.get<TWorkout[]>(API_ENDPOINTS.WORKOUT);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result: any[] = [];

            response.data.forEach(
                ({
                    durationMinutes,
                    dateStart,
                    maxPlaces,
                    participants,
                    id,
                    sportType,
                    title,
                    description,
                    orders,
                    trainer,
                }) => {
                    const isFuture = new Date(dateStart) > new Date();

                    if (!isFuture) {
                        return;
                    }

                    const availablePlaces = maxPlaces - (participants?.length ?? 0);
                    const isActive = !!availablePlaces;

                    const mainColor = isActive ? '#15aabf' : '#15aabfcf';

                    result.push({
                        id: id.toString(),
                        title: sportType,
                        start: dateStart,
                        end: dayjs(dateStart).add(durationMinutes, 'minutes').toDate(),
                        textColor: isActive ? 'white' : '#ffffff6b',
                        mainColor,
                        info: {
                            id,
                            availablePlaces,
                            durationMinutes,
                            title,
                            sportType,
                            maxPlaces,
                            description,
                            orders,
                            trainer,
                        },
                    });
                }
            );

            return result;
        },
        queryKey: [QUERY_KEYS.WORKOUT],
    });
};
