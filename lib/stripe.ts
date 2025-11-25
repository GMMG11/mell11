import Stripe from 'stripe';

// TODO: Add your Stripe secret key to .env
// Get it from: https://dashboard.stripe.com/apikeys
// STRIPE_SECRET_KEY=sk_test_...

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn('⚠️  STRIPE_SECRET_KEY not configured. Payment functionality will be limited.');
}

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    })
  : null;

export interface CreatePaymentIntentParams {
  amount: number; // in dollars
  bookingId: string;
  clientEmail: string;
  description: string;
}

export async function createPaymentIntent(params: CreatePaymentIntentParams) {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please add STRIPE_SECRET_KEY to your environment variables.');
  }

  const { amount, bookingId, clientEmail, description } = params;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        bookingId,
      },
      description,
      receipt_email: clientEmail,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}

export async function retrievePaymentIntent(paymentIntentId: string) {
  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  try {
    return await stripe.paymentIntents.retrieve(paymentIntentId);
  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    throw error;
  }
}

export async function refundPayment(paymentIntentId: string, amount?: number) {
  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined, // If amount not specified, refund full amount
    });

    return refund;
  } catch (error) {
    console.error('Error processing refund:', error);
    throw error;
  }
}
