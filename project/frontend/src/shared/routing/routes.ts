export const ROUTES = {
    MAIN: '/',
    PROFILE: (id: number | string) => `/profile/${id}`,
    AUTHORIZATION: '/authorization',
    CREATE_WORKOUT: '/create',
    SCHEDULE: '/schedule',
    WORKOUT: (id: number | string) => `/workout/${id}`,
    EDIT_WORKOUT: (id: number | string) => `/workout-edit/${id}`,
    PAYMENT_FINISH: '/payment-finish',
};
