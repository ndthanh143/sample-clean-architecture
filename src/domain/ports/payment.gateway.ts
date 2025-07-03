export interface PaymentGateway {
  createPaymentIntent(amount: number, currency?: string): Promise<{ clientSecret: string }>;
}
