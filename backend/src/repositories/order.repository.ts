import pool from '../database.js';

export interface OrderRow {
  id: number;
  user_id: number;
  stripe_payment_intent_id: string;
  status: string;
  total_amount: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  created_at: Date;
}

export interface OrderItemRow {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  unit_price: string;
  size: string;
  quantity: number;
}

export interface OrderWithItems extends OrderRow {
  items: OrderItemRow[];
}

async function getOrdersWithItems(query: string, params: any[]): Promise<OrderWithItems[]> {
  const { rows: orders } = await pool.query<OrderRow>(query, params);
  
  if (orders.length === 0) return [];

  const orderIds = orders.map(o => o.id);
  
  const { rows: items } = await pool.query<OrderItemRow>(
    `SELECT * FROM order_items WHERE order_id = ANY($1) ORDER BY id ASC`,
    [orderIds]
  );

  return orders.map(order => ({
    ...order,
    items: items.filter(item => item.order_id === order.id)
  }));
}

export async function getByUserId(userId: number): Promise<OrderWithItems[]> {
  return getOrdersWithItems(
    `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
}

export async function getAll(): Promise<OrderWithItems[]> {
  return getOrdersWithItems(
    `SELECT * FROM orders ORDER BY created_at DESC`,
    []
  );
}

export default {
  getByUserId,
  getAll
};
