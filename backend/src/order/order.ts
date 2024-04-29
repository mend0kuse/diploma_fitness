import { OneOfProperty } from '../shared/typescript/OneOfProperty';

export const ORDER_STATUS = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
} as const;

export type TOrderStatus = OneOfProperty<typeof ORDER_STATUS>;
