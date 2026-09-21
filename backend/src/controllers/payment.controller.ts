import type { Request, Response } from 'express';
import { createPaymentIntent } from '../services/stripe.service.js';

export async function createPaymentIntentHandler(req: Request, res: Response): Promise<void> {
  try {
    const { clientSecret, amount } = await createPaymentIntent(res.locals.userId);
    res.status(200).json({ clientSecret, amount });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    if (msg === 'Cart is empty') {
      res.status(400).json({ error: msg });
      return;
    }
    console.error('Failed to create payment intent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
