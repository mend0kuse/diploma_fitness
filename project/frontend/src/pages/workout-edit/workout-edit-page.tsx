import { CenteredLayout, Layout } from '@/layout';
import { useGetWorkoutById } from '@/pages/workout/lib/useGetWorkout';
import {
    Box,
    Button,
    Container,
    Fieldset,
    Loader,
    Select,
    Slider,
    TextInput,
    Textarea,
    Text,
    Title,
    Stack,
    Group,
} from '@mantine/core';
import { Error } from '@/shared/ui/error/error';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useEditWorkout } from '../workout/lib/useEditWorkout';
import { useForm } from '@mantine/form';
import { dayjs } from '@/shared/lib/date/dayjs';
import { TWorkoutInput, WORKOUT_TYPE } from '@/entities/workout/workout-types';
import { DateTimePicker } from '@mantine/dates';
import { useGetTrainers } from '../schedule/useGetTrainers';
import { useEffect } from 'react';

export const WorkoutEditPage = observer(() => {
    const { id } = useParams<{ id: string }>();

    const { data: workout, isError, refetch, isLoading, error } = useGetWorkoutById(id);
    const { mutate: editWorkoutMutation, isPending: isEditPending } = useEditWorkout(id);
    const { data: trainers, isLoading: isLoadingTrainers } = useGetTrainers();

    const form = useForm<TWorkoutInput>({
        validate: {
            title: (value) => (value.length > 0 ? null : 'Обязательное поле'),
            description: (value) => (value.length > 0 ? null : 'Обязательное поле'),
            trainerId: (value) => (value ? null : 'Обязательное поле'),
        },
    });

    const setInitialValues = () => {
        if (workout) {
            form.setValues({
                title: workout.title,
                description: workout.description,
                sportType: workout.sportType,
                maxPlaces: workout.maxPlaces,
                trainerId: workout.trainerId.toString(),
                durationMinutes: dayjs.duration({ minutes: workout?.durationMinutes }).asMinutes(),
                dateStart: new Date(workout?.dateStart),
            });
        }
    };

    useEffect(() => {
        setInitialValues();
    }, [workout]);

    const editWorkout = () => {
        const values = form.getValues();
        console.log(values);

        editWorkoutMutation({ workout: { ...values, trainerId: Number(values.trainerId) } });
    };

    if (isLoading || isLoadingTrainers) {
        return (
            <CenteredLayout>
                <Loader />
            </CenteredLayout>
        );
    }

    if (isError || !workout) {
        return (
            <CenteredLayout>
                <Error message={error ? transformAxiosError(error) : undefined} onTryAgain={refetch} />
            </CenteredLayout>
        );
    }

    return (
        <Layout>
            <Container size={'xl'}>
                <Title mb={20}>Обновление тренировки</Title>
                <Group align='start'>
                    <Fieldset w={500}>
                        <Stack gap={5}>
                            <TextInput label='Название' placeholder='Название' {...form.getInputProps('title')} />
                            <Textarea label='Описание' placeholder='Описание' {...form.getInputProps('description')} />
                            <Select
                                label='Тип тренировки'
                                placeholder='Выберите значение'
                                data={Object.values(WORKOUT_TYPE)}
                                {...form.getInputProps('sportType')}
                            />
                            <Select
                                label='Тренер'
                                data={(trainers ?? []).map((trainer) => ({
                                    label: trainer.profile.name ?? trainer.email,
                                    value: trainer.id.toString(),
                                }))}
                                {...form.getInputProps('trainerId')}
                            />
                            <DateTimePicker
                                {...form.getInputProps('dateStart')}
                                minDate={dayjs().add(1, 'hour').toDate()}
                                label='Дата'
                                placeholder='...'
                            />

                            <Box>
                                <Text mb={5} size='sm'>
                                    Длительность
                                </Text>
                                <Slider
                                    marks={[
                                        { value: dayjs.duration({ minutes: 30 }).asMinutes(), label: '30 m' },
                                        { value: dayjs.duration({ minutes: 60 }).asMinutes(), label: '1 ч' },
                                        { value: dayjs.duration({ minutes: 90 }).asMinutes(), label: '1.5 ч' },
                                        { value: dayjs.duration({ minutes: 120 }).asMinutes(), label: '2 ч' },
                                        { value: dayjs.duration({ minutes: 150 }).asMinutes(), label: '2.5 ч' },
                                        { value: dayjs.duration({ minutes: 180 }).asMinutes(), label: '3ч' },
                                    ]}
                                    step={dayjs.duration({ minutes: 5 }).asMinutes()}
                                    min={dayjs.duration({ minutes: 30 }).asMinutes()}
                                    max={dayjs.duration({ hours: 3 }).asMinutes()}
                                    label={(value) => {
                                        return dayjs.duration(value, 'minutes').format('HH:mm');
                                    }}
                                    {...form.getInputProps('durationMinutes')}
                                />
                            </Box>

                            <Box mt={20}>
                                <Text mb={5} size='sm'>
                                    Участники
                                </Text>
                                <Slider
                                    step={1}
                                    min={5}
                                    max={20}
                                    label={(value) => {
                                        return value;
                                    }}
                                    {...form.getInputProps('maxPlaces')}
                                />
                            </Box>
                        </Stack>
                    </Fieldset>

                    <Stack>
                        <Button onClick={setInitialValues} disabled={isEditPending}>
                            Отменить изменения
                        </Button>
                        <Button onClick={editWorkout} loading={isEditPending}>
                            Обновить
                        </Button>
                    </Stack>
                </Group>
            </Container>
        </Layout>
    );
});
