export const ROUTES = {
    MAIN: '/',
    PROFILE: (id: number) => `/profile/${id}`,
    AUTHORIZATION: '/authorization',
    CREATE_WORKOUT: '/create',
    SCHEDULE: '/create',
    WORKOUT: (id: number) => `/workout/${id}`,
};
