import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Paper, Group, Button, Divider, Anchor, Stack, Title } from '@mantine/core';
import { authorization, useRegistration } from '@/entities/user/hooks/authorization';
import { isValidEmail, isValidPassword } from '@/shared/lib/validator/regexp';
import { Layout } from '@/layout';

export const AuthorizationPage = () => {
    const [type, toggle] = useToggle(['Войти', 'Зарегистрироваться']);

    const { register, error: registerError, isPending: isPendingRegister } = useRegistration();

    const { login, isPending: isPendingLogin, error: loginError } = authorization({ withRedirect: true });

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

    const isLogin = type === 'Войти';
    const isRegister = !isLogin;

    const onSubmit = (user: typeof form.values) => {
        if (isLogin) {
            login(user);
        } else {
            register(user);
        }
    };

    return (
        <Layout>
            <Paper radius='md' p='xl' maw={800} withBorder>
                <Title>Добро пожаловать</Title>

                <Divider labelPosition='center' my='lg' />

                <form onSubmit={form.onSubmit(onSubmit)}>
                    <Stack>
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
                        <Anchor component='button' type='button' c='dimmed' onClick={() => toggle()} size='xs'>
                            {isRegister ? 'Уже есть аккаунт? Войдите' : 'Нет аккаунта? Зарегистрируйтесь'}
                        </Anchor>
                        <Button type='submit' radius='xl'>
                            {upperFirst(type)}
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Layout>
    );
};
