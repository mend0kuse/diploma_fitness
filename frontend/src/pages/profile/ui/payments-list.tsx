import { TPayment, TPaymentStatus } from '@/entities/payment/payments';
import { Table, Text } from '@mantine/core';

const TEXT_BY_STATUS: Record<TPaymentStatus, string> = {
    pending: 'Ожидает оплаты',
    canceled: 'Отменен',
    succeeded: 'Успешно оплачен',
} as const;

export const PaymentsList = ({ payments }: { payments: TPayment[] }) => {
    return (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing='xs'>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Описание</Table.Th>
                        <Table.Th>Стоимость</Table.Th>
                        <Table.Th>Дата покупки</Table.Th>
                        <Table.Th>Дата окончания</Table.Th>
                        <Table.Th>Статус</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {payments.map(({ status, id, createdAt, expiresAt, description, value }) => {
                        const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

                        return (
                            <Table.Tr key={id}>
                                <Table.Td>
                                    <Text>{description}</Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text>{value} рублей</Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text>{formatDate(createdAt)}</Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text>{formatDate(expiresAt)}</Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text>{TEXT_BY_STATUS[status]}</Text>
                                </Table.Td>
                            </Table.Tr>
                        );
                    })}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
};
