import { ProfileInput, TProfile } from '../../user-model';
import { useForm } from '@mantine/form';
import { Avatar, Button, FileInput, Group, Stack, TextInput, Textarea } from '@mantine/core';

type Props = {
    profile: TProfile;
    onSubmit: (profile: ProfileInput) => void;
};

export const ProfileForm = ({ profile, onSubmit }: Props) => {
    const form = useForm<ProfileInput>({
        initialValues: {
            name: profile?.name ?? '',
            status: profile?.status ?? '',
            avatar: null,
        },
    });

    const newAvatarUrl = form.values.avatar ? URL.createObjectURL(form.values.avatar) : null;

    const onReset = () => {
        form.setValues({ status: profile?.status, name: profile?.name, avatar: null });
    };

    return (
        <form onReset={onReset} onSubmit={form.onSubmit(onSubmit)}>
            <Stack w={500}>
                <Avatar m={'0 auto'} size={'xl'} src={newAvatarUrl ?? profile?.avatar} alt='Аватар' />
                <FileInput
                    {...form.getInputProps('avatar')}
                    label='Аватар'
                    placeholder='Загрузите изображение'
                    clearable
                />
                <TextInput label='Имя' {...form.getInputProps('name')} />
                <Textarea label='Статус' {...form.getInputProps('status')} />
                <Group justify='center' mt='md'>
                    <Button variant={'outline'} type='reset'>
                        Сбросить
                    </Button>
                    <Button type='submit'>Сохранить</Button>
                </Group>
            </Stack>
        </form>
    );
};
