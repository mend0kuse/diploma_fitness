import { useEditProfile, useGetUser } from '@/pages/profile/profile';
import { Group, Loader, LoadingOverlay, Modal, Text } from '@mantine/core';
import { CenteredLayout, Layout } from '@/layout';
import { ProfileForm } from '@/entities/user';
import { useDisclosure } from '@mantine/hooks';
import { ProfileInput } from '@/entities/user/user-model';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';
import { convertToFormData } from '@/shared/lib/form/convertToFormData';
import { observer } from 'mobx-react-lite';
import { UserInfoAction } from '@/pages/profile/ui/profile-card/profile-card';

export const ProfilePage = observer(() => {
    const [openedEdit, { open, close }] = useDisclosure(false);

    const { data, error, isError, isLoading } = useGetUser();

    const { editProfile, isPending, error: errorEdit } = useEditProfile({ onSuccess: close });

    const onSubmit = (profile: ProfileInput) => {
        editProfile(convertToFormData(profile, 'avatar'));
    };

    if (isLoading) {
        return (
            <CenteredLayout>
                <Loader />
            </CenteredLayout>
        );
    }

    if (isError || !data) {
        return (
            <CenteredLayout>
                <Text c={'red'} size='lg'>
                    Пользователь не найден
                </Text>
            </CenteredLayout>
        );
    }

    return (
        <Layout>
            <Group justify={'center'}>
                <UserInfoAction user={data} isWithEdit={true} onEditClick={open} />
            </Group>

            <Modal pos={'relative'} opened={openedEdit} onClose={close} title='Редактировать профиль'>
                <LoadingOverlay visible={isPending} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
                <ProfileForm onSubmit={onSubmit} profile={data.profile} />
                {errorEdit && <Text c={'red'}>{transformAxiosError(errorEdit)}</Text>}
            </Modal>
        </Layout>
    );
});
