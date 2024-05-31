"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateParticipants = void 0;
const order_1 = require("../../order/order");
const calculateParticipants = (workout) => {
    return {
        ...workout,
        participants: (workout.orders ?? [])
            .filter((order) => order.status !== order_1.ORDER_STATUS.CANCELLED)
            .map((order) => order.client),
    };
};
exports.calculateParticipants = calculateParticipants;
//# sourceMappingURL=calculateParticipants.js.map