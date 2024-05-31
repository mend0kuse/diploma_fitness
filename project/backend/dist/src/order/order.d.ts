import { OneOfProperty } from '../shared/typescript/OneOfProperty';
export declare const ORDER_STATUS: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
    readonly MISSING: "MISSING";
};
export type TOrderStatus = OneOfProperty<typeof ORDER_STATUS>;
