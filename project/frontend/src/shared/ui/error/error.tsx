import { Container, Title, Text, Button, Group, Stack } from '@mantine/core';

export const Error = ({
    message = 'Произошла непредвиденная ошибка',
    onTryAgain,
    tryAgainText = 'Попробовать снова',
}: {
    tryAgainText?: string;
    message?: string;
    onTryAgain: () => void;
}) => (
    <Container>
        <Stack align='center'>
            <Title fw={900} fz={34}>
                Что-то пошло не так
            </Title>
            <Text c='red' size='lg'>
                {message}
            </Text>
            <Group justify='center'>
                <Button onClick={onTryAgain} size='md'>
                    {tryAgainText}
                </Button>
            </Group>
        </Stack>
    </Container>
);
