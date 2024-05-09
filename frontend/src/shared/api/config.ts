export const API_ENDPOINTS = {
    REGISTRATION: '/auth/signup',
    LOGIN: '/auth/signin',

    USER: (id: number) => `/user/${id}`,
    EDIT_PROFILE: `/user/profile`,
    TRAINER: `/user/trainer`,

    WORKOUT: '/workout',
    WORKOUT_BY_ID: (id: number | string) => `/workout/${id}`,

    CHAT: `/chat`,
    CHAT_BY_ID: (id: number | string) => `/chat/${id}`,

    REVIEW: `/review`,
    REVIEW_BY_USER_ID: (userId: number | string) => `/review/user/${userId}`,

    ORDER: '/order',
    ORDER_BY_WORKOUT_ID: (id: number | string) => `/order/${id}`,
    CANCEL_ORDER_BY_ID: (id: number | string) => `/order/cancel/${id}`,
};
export const QUERY_KEYS = {
    REVIEW: 'review',
    USER: 'user',
    TRAINER: 'trainer',
    CHAT: 'chat',
    WORKOUT: 'workout',
    WORKOUT_BY_ID: (id: string | number) => `workout_${id}`,
    ORDER: 'order',
};
