import { ILogger } from '@/domain/logger/logger.interface';
import { PaymentRepository } from '@/domain/repositories/paymentRepository.interface';
import { PaymentStatus } from '@/utils';
import { PaymentM } from '@/domain/model/payment';

export class UpdatePaymentUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: PaymentRepository,
  ) {}

  async executeCompletedStatus(id: number): Promise<void> {
    const item = new PaymentM();
    item.status = PaymentStatus.COMPLETED;

    this.repo.update(id, item as PaymentM);
    this.logger.log('UpdatePaymentUseCases execute', `Payment ${id} have been updated`);
  }

  async executeRefundStatus(id: number): Promise<void> {
    const item = new PaymentM();
    item.status = PaymentStatus.REFUNDED;

    this.repo.update(id, item as PaymentM);
    this.logger.log('UpdatePaymentUseCases execute', `Payment ${id} have been updated`);
  }

  async executePendingStatus(id: number): Promise<void> {
    const item = new PaymentM();
    item.status = PaymentStatus.PENDING;

    this.repo.update(id, item as PaymentM);
    this.logger.log('UpdatePaymentUseCases execute', `Payment ${id} have been updated`);
  }

  async executeFailedStatus(id: number): Promise<void> {
    const item = new PaymentM();
    item.status = PaymentStatus.FAILED;

    this.repo.update(id, item as PaymentM);
    this.logger.log('UpdatePaymentUseCases execute', `Payment ${id} have been updated`);
  }
}
