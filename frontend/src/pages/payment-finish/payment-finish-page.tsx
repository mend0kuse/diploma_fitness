import { useGetOrderInfo } from '@/entities/payment/payment-hooks';
import { CenteredLayout, Layout } from '@/layout';
import { dayjs } from '@/shared/lib/date/dayjs';
import { ROUTES } from '@/shared/routing/routes';
import { Error } from '@/shared/ui/error/error';
import { Button, Container, Loader, Stack, Title, Text } from '@mantine/core';
import { Link, useSearchParams } from 'react-router-dom';

export const PaymentFinishPage = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('order_id');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { data, isPending, isLoading, isFetching, isError, refetch } = useGetOrderInfo(orderId);

    if (isPending || isLoading || isFetching) {
        return (
            <CenteredLayout>
                <Loader />
            </CenteredLayout>
        );
    }

    if (isError) {
        return (
            <CenteredLayout>
                <Error onTryAgain={refetch} />
            </CenteredLayout>
        );
    }

    const status = data.status;

    return (
        <Layout>
            <Container>
                {status !== 'succeeded' ? (
                    <Title ta='center'>Платеж в ожидании или отменен</Title>
                ) : (
                    <Stack>
                        <Title ta='center'>Платеж прошел успешно, абонемент куплен</Title>
                        <Text fw={600} ta={'center'}>
                            Абонемент действителен до{' '}
                            {dayjs(data.created_at).add(data.metadata.months, 'months').toDate().toLocaleDateString()}
                        </Text>
                        <Button variant='transparent' component={Link} to={ROUTES.SCHEDULE}>
                            Перейти к выбору тренировки
                        </Button>
                    </Stack>
                )}
            </Container>
        </Layout>
    );
};
