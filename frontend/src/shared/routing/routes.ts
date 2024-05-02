export const ROUTES = {
    MAIN: '/',
    PROFILE: (id: number) => `/profile/${id}`,
    AUTHORIZATION: '/authorization',
    CREATE_WORKOUT: '/create',
    SCHEDULE: '/schedule',
    WORKOUT: (id: number) => `/workout/${id}`,
};
