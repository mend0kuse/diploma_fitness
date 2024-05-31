type WorkoutQueryInternal = {
    dateStart: Date;
    dateEnd: Date;
    trainerId: number;
    type: string;
    limit: number;
    page: number;
    order: 'asc' | 'desc';
    sort: 'dateStart' | 'dateEnd' | 'trainerId' | 'type';
    hasAvailablePlaces: boolean;
    userId: number;
};
export type TWorkoutQuery = Partial<WorkoutQueryInternal>;
export {};
