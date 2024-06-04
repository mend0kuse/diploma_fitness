import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '@/pages/main';
import { NothingFound } from '@/pages/error';
import { ProfilePage } from '@/pages/profile/profile-page';
import { ROUTES } from '@/shared/routing/routes';
import { AuthorizationPage } from '@/pages/authorization/authorization';
import { WorkoutPage } from '@/pages/workout/workout-page';
import { CreateWorkoutPage } from '@/pages/create-workout/create-workout-page';
import { SchedulePage } from '@/pages/schedule/schedule-page';
import { PaymentFinishPage } from '@/pages/payment-finish/payment-finish-page';
import { WorkoutEditPage } from '@/pages/workout-edit/workout-edit-page';

export const router = createBrowserRouter([
    {
        path: '/profile/:id',
        element: <ProfilePage />,
    },
    {
        path: ROUTES.MAIN,
        element: <MainPage />,
        errorElement: <NothingFound />,
    },
    {
        path: ROUTES.AUTHORIZATION,
        element: <AuthorizationPage />,
    },
    {
        path: '/workout/:id',
        element: <WorkoutPage />,
    },
    {
        path: '/workout-edit/:id',
        element: <WorkoutEditPage />,
    },
    {
        path: ROUTES.CREATE_WORKOUT,
        element: <CreateWorkoutPage />,
    },
    {
        path: ROUTES.SCHEDULE,
        element: <SchedulePage />,
    },
    {
        path: ROUTES.PAYMENT_FINISH,
        element: <PaymentFinishPage />,
    },
]);
