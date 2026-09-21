import type { Request, Response } from 'express';
import { createPaidOrder, getUserOrders, getAllOrders } from '../services/order.service.js';

export async function getMyOrdersHandler(req: Request, res: Response): Promise<void> {
  try {
    const orders = await getUserOrders(res.locals.userId);
    res.json({ orders });
  } catch (error) {
    console.error('Failed to get my orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getAllOrdersHandler(req: Request, res: Response): Promise<void> {
  try {
    const orders = await getAllOrders();
    res.json({ orders });
  } catch (error) {
    console.error('Failed to get all orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function createOrderHandler(req: Request, res: Response): Promise<void> {
  const {
    paymentIntentId,
    firstName,
    lastName,
    email,
    address,
    city,
    zip,
    country,
  } = req.body;

  const shipping = { firstName, lastName, email, address, city, zip, country };

  if (
    typeof paymentIntentId !== 'string' ||
    Object.values(shipping).some((value) => typeof value !== 'string' || !value.trim())
  ) {
    res.status(400).json({ error: 'Invalid payment or shipping details' });
    return;
  }

  try {
    const order = await createPaidOrder(res.locals.userId, paymentIntentId, {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      address: address.trim(),
      city: city.trim(),
      zip: zip.trim(),
      country: country.trim(),
    });
    res.status(201).json({ order });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    if (message === 'Cart is empty') {
      res.status(400).json({ error: message });
      return;
    }

    if (
      message === 'Payment has not been completed' ||
      message === 'Payment amount does not match cart'
    ) {
      res.status(409).json({ error: message });
      return;
    }

    console.error('Failed to create order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
