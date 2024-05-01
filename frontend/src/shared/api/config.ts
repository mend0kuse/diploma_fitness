export const API_ENDPOINTS = {
    REGISTRATION: '/auth/signup',
    LOGIN: '/auth/signin',

    USER: (id: number) => `/user/${id}`,
    EDIT_PROFILE: `/user/profile`,

    WORKOUT: 'workout',
};
export const QUERY_KEYS = {
    USER: 'user',
    WORKOUT: 'workout',
    ORDER: 'order',
};
