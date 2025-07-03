import { AccountPasswordUpdatedCommandHandler } from './account-password-updated.handler';
import { OrderConfirmationHandler } from './order-confirmation.handler';
import { RecalculatePriceHandler } from './recalculate-price.handler';

export const eventHandlers = [
  AccountPasswordUpdatedCommandHandler,
  OrderConfirmationHandler,
  RecalculatePriceHandler,
];
