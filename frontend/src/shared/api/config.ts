export const API_ENDPOINTS = {
    REGISTRATION: '/auth/signup',
    LOGIN: '/auth/signin',

    USER: (id: number) => `/user/${id}`,
    EDIT_PROFILE: `/user/profile`,
    TRAINER: `/user/trainer`,

    WORKOUT: '/workout',
    WORKOUT_BY_ID: (id: number | string) => `/workout/${id}`,

    ORDER: '/order',
    ORDER_BY_WORKOUT_ID: (id: number | string) => `/order/${id}`,
    CANCEL_ORDER_BY_ID: (id: number | string) => `/order/cancel/${id}`,
};
export const QUERY_KEYS = {
    USER: 'user',
    TRAINER: 'trainer',
    WORKOUT: 'workout',
    WORKOUT_BY_ID: (id: string | number) => `workout_${id}`,
    ORDER: 'order',
};
