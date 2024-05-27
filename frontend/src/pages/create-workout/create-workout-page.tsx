import { useState } from 'react';
import {
    Stepper,
    Button,
    Group,
    TextInput,
    Select,
    Stack,
    Text,
    Slider,
    Center,
    Textarea,
    Box,
    Anchor,
    Paper,
    Loader,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { CenteredLayout, Layout } from '@/layout';
import { DateTimePicker } from '@mantine/dates';
import { dayjs } from '@/shared/lib/date/dayjs';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/routing/routes';
import { TWorkoutInput, WORKOUT_TYPE } from '@/entities/workout/workout-types';
import { useCreateWorkout } from '@/pages/create-workout/useCreateWorkout';
import { useGetTrainers } from '../schedule/useGetTrainers';

const initialValues: TWorkoutInput = {
    title: '',
    description: '',
    sportType: 'Фитнес',

    dateStart: new Date(),
    durationMinutes: dayjs.duration({ minutes: 60 }).asMinutes(),

    maxPlaces: 10,
    trainerId: null,
};

export const CreateWorkoutPage = () => {
    const [step, setStep] = useState(0);
    const { data: trainers, isLoading: isLoadingTrainers } = useGetTrainers();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues,
    });

    const {
        createWorkout,
        isPending,
        data: createdWorkout,
    } = useCreateWorkout({
        onSuccess: () => {
            setStep(3);
        },
    });

    const nextStep = () => {
        setStep((current) => {
            if (form.validate().hasErrors) {
                return current;
            }

            return current < 3 ? current + 1 : current;
        });
    };

    const prevStep = () => {
        setStep((current) => {
            return current > 0 ? current - 1 : current;
        });
    };

    const isFirstStep = step === 0;
    const isLastStep = step === 2;
    const isFinish = step === 3;
    const isShowNextButton = !isFinish && !isLastStep;

    const onCreate = () => {
        if (form.validate().hasErrors) {
            return;
        }

        createWorkout(form.getValues());
    };

    if (isLoadingTrainers) {
        return (
            <CenteredLayout>
                <Loader />
            </CenteredLayout>
        );
    }

    return (
        <Layout>
            <Center mih={'100%'}>
                <Stack align={'center'}>
                    <Stepper active={step}>
                        <Stepper.Step label='Информация'>
                            <Paper shadow='xs' p='xl'>
                                <Stack>
                                    <TextInput
                                        label='Название'
                                        placeholder='Название'
                                        {...form.getInputProps('title')}
                                    />
                                    <Textarea
                                        label='Описание'
                                        placeholder='Описание'
                                        {...form.getInputProps('description')}
                                    />
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
                                </Stack>
                            </Paper>
                        </Stepper.Step>

                        <Stepper.Step label='Дата и время'>
                            <Paper shadow='xs' p='xl'>
                                <Stack>
                                    <DateTimePicker
                                        {...form.getInputProps('dateStart')}
                                        label='Дата'
                                        placeholder='...'
                                    />
                                    <Box>
                                        <Text mb={10} size='sm'>
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
                                </Stack>
                            </Paper>
                        </Stepper.Step>

                        <Stepper.Step loading={isPending} label='Места'>
                            <Paper shadow='xs' p='xl'>
                                <Text mb={10} size='sm'>
                                    Максимальное кол-во участников
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
                            </Paper>
                        </Stepper.Step>

                        <Stepper.Completed>
                            <Paper shadow='xs' p='xl'>
                                <Stack align={'center'}>
                                    <Text>Тренировка успешно создана</Text>
                                    {createdWorkout && (
                                        <Anchor component={Link} to={ROUTES.WORKOUT(createdWorkout.data.id)}>
                                            Перейти
                                        </Anchor>
                                    )}
                                </Stack>
                            </Paper>
                        </Stepper.Completed>
                    </Stepper>

                    <Group justify='flex-end' mt='xl'>
                        {!isFirstStep && !isFinish && (
                            <Button variant='default' disabled={isPending} onClick={prevStep}>
                                Назад
                            </Button>
                        )}
                        {isShowNextButton && (
                            <Button disabled={isPending} onClick={nextStep}>
                                Дальше
                            </Button>
                        )}
                        {isLastStep && (
                            <Button disabled={isPending} onClick={onCreate}>
                                Создать
                            </Button>
                        )}
                    </Group>
                </Stack>
            </Center>
        </Layout>
    );
};
