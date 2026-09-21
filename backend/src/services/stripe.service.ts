import Stripe from 'stripe';
import cartRepository from '../repositories/cart.repository.js';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not configured');
}

const stripe = new Stripe(stripeSecretKey);

export async function createPaymentIntent(userId: number): Promise<{ clientSecret: string; amount: number }> {
  const items = await cartRepository.getItems(userId);

  if (items.length === 0) throw new Error('Cart is empty');

  const amount = items.reduce((sum, item) => {
    return sum + Math.round(Number(item.price) * item.quantity * 100);
  }, 999);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    metadata: { userId: String(userId) },
  });

  if (!paymentIntent.client_secret) throw new Error('Failed to create payment intent');

  return { clientSecret: paymentIntent.client_secret, amount };
}
