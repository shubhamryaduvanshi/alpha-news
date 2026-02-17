import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body: { amount: number; currency: string }) {
    
    return this.paymentService.createPaymentIntent(body.amount, body.currency);
  }

  // Webhook endpoint to handle Stripe events (e.g., payment success, failure)
  @Post('webhook')
  async handleStripeWebhook(@Body() event: any) {
    return this.paymentService.handleStripeWebhook(event);
  }

}
