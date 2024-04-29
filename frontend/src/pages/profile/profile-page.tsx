import { useEditProfile, useGetUser } from '@/pages/profile/profile';
import { ActionIcon, Group, LoadingOverlay, Modal, Text } from '@mantine/core';
import { CenteredLayout, Layout } from '@/layout';
import { ProfileCard, ProfileForm } from '@/entities/user';
import { useDisclosure } from '@mantine/hooks';
import { AiFillEdit } from 'react-icons/ai';
import { ProfileInput, user as userStore } from '@/entities/user/user-model';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';
import { convertToFormData } from '@/shared/lib/form/convertToFormData';
import { observer } from 'mobx-react-lite';

export const ProfilePage = observer(() => {
    const [openedEdit, { open, close }] = useDisclosure(false);

    const { user, error, isFetching: isFetchingUser } = useGetUser();
    const isHomeProfile = !!userStore.id && user?.id === userStore.id;

    const { editProfile, isPending, error: errorEdit } = useEditProfile({ onSuccess: close });

    const onSubmit = (profile: ProfileInput) => {
        editProfile(convertToFormData(profile, 'avatar'));
    };

    if (!user) {
        return (
            <CenteredLayout>
                <Text c={'red'} size='lg'>
                    Пользователь не найден
                </Text>
            </CenteredLayout>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <Layout>
            <Group>
                <ProfileCard user={user} />

                {isHomeProfile && (
                    <ActionIcon onClick={open} variant='filled' aria-label='Edit'>
                        <AiFillEdit style={{ width: '70%', height: '70%' }} />
                    </ActionIcon>
                )}
            </Group>

            <Modal pos={'relative'} opened={openedEdit} onClose={close} title='Редактировать профиль'>
                <LoadingOverlay visible={isPending} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
                <ProfileForm onSubmit={onSubmit} profile={user.profile} />
                {errorEdit && <Text c={'red'}>{transformAxiosError(errorEdit)}</Text>}
            </Modal>
        </Layout>
    );
});
