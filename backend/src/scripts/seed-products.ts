import pool from '../database.js';
import productRepository from '../repositories/product.repository.js';

const products = [
  { name: 'Pearl-Trim Black Blazer', price: 155, category: 'women', subcategory: 'blazers', imageUrl: 'https://images.unsplash.com/photo-1612731486606-2614b4d74921?w=600&h=750&fit=crop&auto=format', badge: 'New' },
  { name: 'Ivory Linen Midi Dress', price: 98, category: 'women', subcategory: 'dresses', imageUrl: 'https://images.unsplash.com/photo-1659522761084-79196b64abe4?w=600&h=750&fit=crop&auto=format', badge: null },
  { name: 'Scarlet Day Dress', price: 112, category: 'women', subcategory: 'dresses', imageUrl: 'https://images.unsplash.com/photo-1662532577856-e8ee8b138a8b?w=600&h=750&fit=crop&auto=format', badge: 'Trending' },
  { name: 'Tailored Co-ord Set', price: 210, category: 'women', subcategory: 'sets', imageUrl: 'https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?w=600&h=750&fit=crop&auto=format', badge: null },
  { name: 'White Linen Blouse', price: 72, category: 'women', subcategory: 'tops', imageUrl: 'https://images.unsplash.com/flagged/photo-1570733117311-d990c3816c47?w=600&h=750&fit=crop&auto=format', badge: null },
  { name: 'Evening Blazer Set', price: 185, category: 'women', subcategory: 'sets', imageUrl: 'https://images.unsplash.com/photo-1629511565591-a1d494ad6c58?w=600&h=750&fit=crop&auto=format', badge: 'Sale' },
  { name: 'Oxford Button-Down Shirt', price: 45, category: 'men', subcategory: 'shirts', imageUrl: 'https://images.unsplash.com/photo-1543322748-33df6d3db806?w=600&h=750&fit=crop&auto=format', badge: null },
  { name: 'Brown Wool Overcoat', price: 189, category: 'men', subcategory: 'coats', imageUrl: 'https://images.unsplash.com/photo-1619603364937-8d7af41ef206?w=600&h=750&fit=crop&auto=format', badge: 'New' },
  { name: 'Black Structured Blazer', price: 135, category: 'men', subcategory: 'blazers', imageUrl: 'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=600&h=750&fit=crop&auto=format', badge: null },
  { name: 'Slim Wool Trousers', price: 89, category: 'men', subcategory: 'trousers', imageUrl: 'https://images.unsplash.com/photo-1619603364904-c0498317e145?w=600&h=750&fit=crop&auto=format', badge: null }
];

try {
  for (const product of products) {
    const existing = await pool.query(
      'SELECT id FROM products WHERE name = $1',
      [product.name]
    );

    if (existing.rowCount === 0) {
      await productRepository.create(
        product.name,
        product.price,
        product.category,
        product.subcategory,
        product.imageUrl,
        product.badge
      );
    }
  }

  console.log('Product seed completed.');
} finally {
  await pool.end();
}
