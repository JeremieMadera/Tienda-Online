import cartRepository from '../repositories/cart.repository.js';
import type { CartItem } from '../types/cart.types.js';

export async function getCart(userId: number): Promise<CartItem[]> {
  return cartRepository.getItems(userId);
}

export async function addToCart(
  userId: number,
  productId: number,
  size: string,
  quantity: number
): Promise<CartItem[]> {
  if (!Number.isInteger(productId) || productId < 1) throw new Error('Invalid product');
  if (typeof size !== 'string' || !size.trim()) throw new Error('Invalid size');
  if (!Number.isInteger(quantity) || quantity < 1) throw new Error('Invalid quantity');

  await cartRepository.upsertItem(userId, productId, size, quantity);
  return cartRepository.getItems(userId);
}

export async function updateCartItem(
  userId: number,
  itemId: number,
  quantity: number
): Promise<CartItem[]> {
  if (!Number.isInteger(quantity) || quantity < 0) throw new Error('Invalid quantity');

  if (quantity === 0) {
    await cartRepository.removeItem(userId, itemId);
  } else {
    await cartRepository.updateQuantity(userId, itemId, quantity);
  }
  return cartRepository.getItems(userId);
}

export async function removeFromCart(userId: number, itemId: number): Promise<CartItem[]> {
  await cartRepository.removeItem(userId, itemId);
  return cartRepository.getItems(userId);
}
