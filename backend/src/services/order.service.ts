import Stripe from 'stripe';
import pool from '../database.js';
import cartRepository from '../repositories/cart.repository.js';
import orderRepository from '../repositories/order.repository.js';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not configured');
}

const stripe = new Stripe(stripeSecretKey);
const SHIPPING_CENTS = 999;

type ShippingDetails = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  country: string;
};

export async function createPaidOrder(
  userId: number,
  paymentIntentId: string,
  shipping: ShippingDetails
): Promise<{ id: number; totalAmount: string }> {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (
    paymentIntent.status !== 'succeeded' ||
    paymentIntent.metadata.userId !== String(userId)
  ) {
    throw new Error('Payment has not been completed');
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const existing = await client.query(
      `SELECT id, total_amount
       FROM orders
       WHERE stripe_payment_intent_id = $1
         AND user_id = $2`,
      [paymentIntentId, userId]
    );

    if (existing.rows[0]) {
      await client.query('COMMIT');
      return {
        id: existing.rows[0].id,
        totalAmount: existing.rows[0].total_amount,
      };
    }

    const items = await cartRepository.getItems(userId);
    if (items.length === 0) {
      throw new Error('Cart is empty');
    }

    const totalCents = items.reduce(
      (sum, item) => sum + Math.round(Number(item.price) * item.quantity * 100),
      SHIPPING_CENTS
    );

    if (paymentIntent.amount !== totalCents) {
      await stripe.refunds.create({ payment_intent: paymentIntentId });
      throw new Error('Payment amount does not match cart');
    }

    const order = await client.query(
      `INSERT INTO orders
       (user_id, stripe_payment_intent_id, total_amount, first_name, last_name,
        email, address, city, zip, country)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING id, total_amount`,
      [
        userId,
        paymentIntentId,
        totalCents / 100,
        shipping.firstName,
        shipping.lastName,
        shipping.email,
        shipping.address,
        shipping.city,
        shipping.zip,
        shipping.country,
      ]
    );

    for (const item of items) {
      await client.query(
        `INSERT INTO order_items
         (order_id, product_id, product_name, unit_price, size, quantity)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          order.rows[0].id,
          item.product_id,
          item.name,
          item.price,
          item.size,
          item.quantity,
        ]
      );
    }

    await client.query(
      `DELETE FROM cart_items ci
       USING carts c
       WHERE ci.cart_id = c.id
         AND c.user_id = $1`,
      [userId]
    );

    await client.query('COMMIT');

    return {
      id: order.rows[0].id,
      totalAmount: order.rows[0].total_amount,
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function getUserOrders(userId: number) {
  return orderRepository.getByUserId(userId);
}

export async function getAllOrders() {
  return orderRepository.getAll();
}
