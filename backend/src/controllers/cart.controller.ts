import type { Request, Response } from 'express';
import { getCart, addToCart, updateCartItem, removeFromCart } from '../services/cart.service.js';

export async function getCartHandler(req: Request, res: Response): Promise<void> {
  try {
    const items = await getCart(res.locals.userId);
    res.status(200).json({ items });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function addToCartHandler(req: Request, res: Response): Promise<void> {
  const { product_id, size, quantity = 1 } = req.body;

  if (typeof product_id !== 'number' || typeof size !== 'string') {
    res.status(400).json({ error: 'product_id and size are required' });
    return;
  }

  try {
    const items = await addToCart(res.locals.userId, product_id, size, quantity);
    res.status(200).json({ items });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ error: msg });
  }
}

export async function updateCartItemHandler(req: Request, res: Response): Promise<void> {
  const itemId = Number(req.params.itemId);
  const { quantity } = req.body;

  if (!Number.isInteger(itemId) || typeof quantity !== 'number') {
    res.status(400).json({ error: 'Invalid itemId or quantity' });
    return;
  }

  try {
    const items = await updateCartItem(res.locals.userId, itemId, quantity);
    res.status(200).json({ items });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ error: msg });
  }
}

export async function removeFromCartHandler(req: Request, res: Response): Promise<void> {
  const itemId = Number(req.params.itemId);

  if (!Number.isInteger(itemId)) {
    res.status(400).json({ error: 'Invalid itemId' });
    return;
  }

  try {
    const items = await removeFromCart(res.locals.userId, itemId);
    res.status(200).json({ items });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
}
