import { Workout, WorkoutOrder, User } from '@prisma/client';
import { ORDER_STATUS } from 'src/order/order';

export const calculateParticipants = (workout: Workout & { orders: (WorkoutOrder & { client?: User })[] }) => {
    return {
        ...workout,
        participants: (workout.orders ?? [])
            .filter((order) => order.status !== ORDER_STATUS.CANCELLED)
            .map((order) => order.client),
    };
};
