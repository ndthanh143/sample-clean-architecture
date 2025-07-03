// src/modules/payment/infrastructure/stripe/stripe.service.ts
import { PaymentGateway } from '@/domain/ports/payment.gateway';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService implements PaymentGateway {
  private stripe: Stripe;

  constructor() {
    // this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    //   apiVersion: '2025-04-30.basil',
    // });
  }

  async createPaymentIntent(amount: number, currency: string = 'vnd') {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    });

    return { clientSecret: paymentIntent.client_secret };
  }
}
