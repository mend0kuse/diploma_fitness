import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Paper, Group, Button, Divider, Anchor, Stack, Title, Center } from '@mantine/core';
import { useLogin, useRegistration } from '@/entities/user/hooks/authorization';
import { isValidEmail, isValidPassword } from '@/shared/lib/validator/regexp';
import { Layout } from '@/layout';

export const AuthorizationPage = () => {
    const [type, toggle] = useToggle(['Войти', 'Зарегистрироваться']);

    const { register, isPending: isPendingRegister } = useRegistration();

    const { login, isPending: isPendingLogin } = useLogin({ withRedirect: true });

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (isValidEmail(value) ? null : 'Неправильная почта'),
            password: (value) => (isValidPassword(value) ? null : 'Неправильный пароль'),
        },
    });

    const onToggle = () => {
        form.setValues({ email: '', password: '' });
        toggle();
    };

    const isLogin = type === 'Войти';
    const isRegister = !isLogin;

    const onSubmit = (user: typeof form.values) => {
        if (isLogin) {
            login(user);
        } else {
            register(user);
        }
    };

    const isLoading = isPendingRegister || isPendingLogin;

    return (
        <Layout>
            <Center>
                <Paper radius='md' p='xl' w={500} withBorder>
                    <Title ta={'center'}>Добро пожаловать!</Title>

                    <Divider labelPosition='center' my='lg' />

                    <form onSubmit={form.onSubmit(onSubmit)}>
                        <Stack pos={'relative'}>
                            <TextInput
                                required
                                label='Email'
                                placeholder='hello@mantine.dev'
                                value={form.values.email}
                                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                                error={form.errors.email}
                                radius='md'
                            />

                            <PasswordInput
                                required
                                label='Пароль'
                                placeholder='Ваш пароль'
                                value={form.values.password}
                                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                                error={form.errors.password}
                                radius='md'
                            />
                        </Stack>

                        <Group justify='space-between' mt='xl'>
                            <Anchor component='button' type='button' c='dimmed' onClick={onToggle} size='xs'>
                                {isRegister ? 'Уже есть аккаунт? Войдите' : 'Нет аккаунта? Зарегистрируйтесь'}
                            </Anchor>
                            <Button disabled={isLoading} loading={isLoading} type='submit' radius='xl'>
                                {upperFirst(type)}
                            </Button>
                        </Group>
                    </form>
                </Paper>
            </Center>
        </Layout>
    );
};
