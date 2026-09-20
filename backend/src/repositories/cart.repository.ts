import pool from '../database.js';
import type { CartItem } from '../types/cart.types.js';

class CartRepository {
  // Returns existing cart id or creates one for the user
  async getOrCreateCartId(userId: number): Promise<number> {
    const existing = await pool.query(
      'SELECT id FROM carts WHERE user_id = $1',
      [userId]
    );
    if (existing.rows.length > 0) return existing.rows[0].id;

    const created = await pool.query(
      'INSERT INTO carts (user_id) VALUES ($1) RETURNING id',
      [userId]
    );
    return created.rows[0].id;
  }

  async getItems(userId: number): Promise<CartItem[]> {
    const result = await pool.query(
      `SELECT ci.id, ci.cart_id, ci.product_id, ci.size, ci.quantity,
              p.name, p.price, p.image_url
       FROM carts c
       JOIN cart_items ci ON ci.cart_id = c.id
       JOIN products p ON p.id = ci.product_id
       WHERE c.user_id = $1
       ORDER BY ci.id`,
      [userId]
    );
    return result.rows;
  }

  async upsertItem(userId: number, productId: number, size: string, quantity: number): Promise<CartItem> {
    const cartId = await this.getOrCreateCartId(userId);

    const result = await pool.query(
      `INSERT INTO cart_items (cart_id, product_id, size, quantity)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (cart_id, product_id, size)
       DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
       RETURNING id, cart_id, product_id, size, quantity`,
      [cartId, productId, size, quantity]
    );
    return result.rows[0];
  }

  async updateQuantity(userId: number, itemId: number, quantity: number): Promise<void> {
    await pool.query(
      `UPDATE cart_items ci
       SET quantity = $1
       FROM carts c
       WHERE ci.id = $2
         AND ci.cart_id = c.id
         AND c.user_id = $3`,
      [quantity, itemId, userId]
    );
  }

  async removeItem(userId: number, itemId: number): Promise<void> {
    await pool.query(
      `DELETE FROM cart_items ci
       USING carts c
       WHERE ci.id = $1
         AND ci.cart_id = c.id
         AND c.user_id = $2`,
      [itemId, userId]
    );
  }

  async clearCart(userId: number): Promise<void> {
    await pool.query(
      `DELETE FROM cart_items ci
       USING carts c
       WHERE ci.cart_id = c.id
         AND c.user_id = $1`,
      [userId]
    );
  }
}

export default new CartRepository();
