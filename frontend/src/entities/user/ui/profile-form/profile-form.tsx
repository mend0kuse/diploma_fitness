import { ProfileInput, TProfile } from '../../user-model';
import { useForm } from '@mantine/form';
import { Avatar, Button, FileInput, Group, TextInput } from '@mantine/core';

type Props = {
    profile: TProfile;
    onSubmit: (profile: ProfileInput) => void;
};

export const ProfileForm = ({ profile, onSubmit }: Props) => {
    const form = useForm<ProfileInput>({
        initialValues: {
            name: profile?.name,
            age: profile?.age,
            avatar: null,
        },
    });

    const newAvatarUrl = form.values.avatar ? URL.createObjectURL(form.values.avatar) : null;

    const onReset = () => {
        form.setValues({ age: profile?.age, name: profile?.name, avatar: null });
    };

    return (
        <form onReset={onReset} onSubmit={form.onSubmit(onSubmit)}>
            <Avatar size={'xl'} src={newAvatarUrl ?? profile?.avatar} alt='Аватар' />
            <FileInput {...form.getInputProps('avatar')} label='Аватар' placeholder='Загрузите изображение' clearable />
            <TextInput label='Имя' {...form.getInputProps('name')} />
            <TextInput label='Возраст' {...form.getInputProps('age')} />
            <Group justify='flex-end' mt='md'>
                <Button variant={'outline'} type='reset'>
                    Сбросить
                </Button>
                <Button type='submit'>Сохранить</Button>
            </Group>
        </form>
    );
};
