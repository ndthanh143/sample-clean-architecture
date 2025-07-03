import { PaymentMethod, PaymentStatus } from '@/utils';
import { AutoMap } from '@automapper/classes';
import { OrderM } from './order';

export class PaymentM {
  @AutoMap()
  id: number;
  @AutoMap()
  amount: number;
  @AutoMap()
  method: PaymentMethod;
  @AutoMap()
  status: PaymentStatus;
  @AutoMap()
  paymentCode: string;
  @AutoMap()
  order: OrderM;
  @AutoMap()
  createdDate: Date;
  @AutoMap()
  updatedDate: Date;
}
