import productRepository, { type Product } from '../repositories/product.repository.js';

const allowedBadges = new Set(['New', 'Trending', 'Sale']);

function validateProductData(
  name: string,
  price: number,
  category: string,
  subcategory: string,
  imageUrl: string,
  badge: string | null
): void {
  if (!name.trim() || !category.trim() || !subcategory.trim() || !imageUrl.trim()) {
    throw new Error('Product text fields cannot be empty');
  }

  if (!Number.isFinite(price) || price < 0) {
    throw new Error('Product price must be a non-negative number');
  }

  if (badge !== null && !allowedBadges.has(badge)) {
    throw new Error('Invalid product badge');
  }
}

export async function getProducts(): Promise<Product[]> {
  return productRepository.getAll();
}

export async function createProduct(
  name: string,
  price: number,
  category: string,
  subcategory: string,
  imageUrl: string,
  badge: string | null
): Promise<Product> {
  validateProductData(name, price, category, subcategory, imageUrl, badge);

  return productRepository.create(
    name.trim(),
    price,
    category.trim(),
    subcategory.trim(),
    imageUrl.trim(),
    badge
  );
}
