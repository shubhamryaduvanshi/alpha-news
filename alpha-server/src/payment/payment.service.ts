import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Stripe } from 'stripe';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Injectable()
export class PaymentService {

  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get<string>('STRIP_SECRET_KEY') ?? '');
  }

  async createPaymentIntent(amount: number, currency: string) {

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency,
      // customer: 'this is a test customer id',
    });
    console.log('Payment Intent created:', paymentIntent);
    return {
      client_secret: paymentIntent.client_secret,
    }
  }


  async handleStripeWebhook(event: any) {
    console.log("Received Stripe webhook event:", event);
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      console.log('Payment succeeded for Payment Intent:', paymentIntent.id);
      // You can add logic here to update your database or perform other actions based on the successful payment
    } else if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object;
      console.log('Payment failed for Payment Intent:', paymentIntent.id);
      // You can add logic here to handle failed payments, such as notifying the user or retrying the payment
    }
    // Handle other event types as needed

  }


}
