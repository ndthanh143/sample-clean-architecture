// src/modules/payment/application/use-cases/create-stripe-payment-intent.usecase.ts

import { PaymentGateway } from '@/domain/ports/payment.gateway';

export class CreateStripePaymentIntentUseCases {
  constructor(private readonly paymentGateway: PaymentGateway) {}

  async execute(amount: number): Promise<{ clientSecret: string }> {
    if (!amount || amount < 1000) {
      throw new Error('Invalid amount');
    }

    return this.paymentGateway.createPaymentIntent(amount, 'vnd');
  }
}
