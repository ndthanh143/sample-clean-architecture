import { PaymentM } from '../model/payment';

export interface PaymentRepository {
  findById(id: number): Promise<PaymentM | null>;
  insert(data: PaymentM): Promise<PaymentM>;
  update(id: number, data: Partial<PaymentM>): Promise<PaymentM>;
  delete(id: number): Promise<void>;
}
