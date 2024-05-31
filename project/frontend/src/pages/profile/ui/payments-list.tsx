import { TPayment, TPaymentStatus } from '@/entities/payment/payments';
import { Table, Text, Button, Modal, Group, Tooltip, Stack } from '@mantine/core';
import { useFreezePayment } from '../profile-hooks';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

const TEXT_BY_STATUS: Record<TPaymentStatus, string> = {
    pending: 'Ожидает оплаты',
    canceled: 'Отменен',
    succeeded: 'Успешно оплачен',
} as const;

export const PaymentsList = ({ payments }: { payments: TPayment[] }) => {
    const { isPending, mutate } = useFreezePayment();
    const [opened, { open, close }] = useDisclosure(false);
    const [paymentToFrozeId, setPaymentToFrozeId] = useState<string | null>(null);

    const confirmFreeze = () => {
        paymentToFrozeId && mutate({ paymentId: paymentToFrozeId });
        close();
    };

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
                    {payments.map((payment) => {
                        const { status, id, createdAt, expiresAt, description, value, freezeEndDate } = payment;

                        const now = new Date();
                        const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

                        const isCurrent = new Date(expiresAt) > now && status === 'succeeded';
                        const isFrozen = freezeEndDate ? new Date(freezeEndDate) > now : false;

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
                                    <Text>
                                        {isFrozen
                                            ? `Заморожен до ${formatDate(freezeEndDate)}`
                                            : TEXT_BY_STATUS[status]}
                                    </Text>
                                </Table.Td>
                                {isCurrent && !isFrozen && (
                                    <Table.Td>
                                        <Tooltip label='На месяц'>
                                            <Button
                                                onClick={() => {
                                                    setPaymentToFrozeId(payment.id);
                                                    open();
                                                }}
                                            >
                                                Заморозить
                                            </Button>
                                        </Tooltip>
                                    </Table.Td>
                                )}

                                <Modal centered opened={opened} onClose={close} title='Подтверждение'>
                                    <Stack>
                                        <Text fw={500}>
                                            Заморозку нельзя отменить. Срок заморозки - 1 месяц. Вы уверены?
                                        </Text>
                                        <Group justify='flex-end'>
                                            <Button onClick={close} loading={isPending}>
                                                Отменить
                                            </Button>

                                            <Button color='red' loading={isPending} onClick={confirmFreeze}>
                                                Заморозить
                                            </Button>
                                        </Group>
                                    </Stack>
                                </Modal>
                            </Table.Tr>
                        );
                    })}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
};
