import pool from '../database.js';

export type Product = {
  id: number;
  name: string;
  price: string;
  category: string;
  subcategory: string;
  image_url: string;
  badge: string | null;
  created_at: Date;
};

class ProductRepository {
  async getAll(): Promise<Product[]> {
    const result = await pool.query(
      `SELECT id, name, price, category, subcategory, image_url, badge, created_at
       FROM products
       ORDER BY id`
    );

    return result.rows;
  }

  async create(
    name: string,
    price: number,
    category: string,
    subcategory: string,
    imageUrl: string,
    badge: string | null
  ): Promise<Product> {
    const result = await pool.query(
      `INSERT INTO products
       (name, price, category, subcategory, image_url, badge)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, price, category, subcategory, image_url, badge, created_at`,
      [name, price, category, subcategory, imageUrl, badge]
    );

    return result.rows[0];
  }
}

export default new ProductRepository();
