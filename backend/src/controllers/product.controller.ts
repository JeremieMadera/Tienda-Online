import type { Request, Response } from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../services/product.service.js';

export async function listProducts(_req: Request, res: Response): Promise<void> {
  try {
    const products = await getProducts();
    res.status(200).json({ products });
  } catch (error) {
    console.error('Failed to load products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function addProduct(req: Request, res: Response): Promise<void> {
  const { name, price, category, subcategory, image_url: imageUrl, badge } = req.body;

  if (
    typeof name !== 'string' ||
    typeof price !== 'number' ||
    typeof category !== 'string' ||
    typeof subcategory !== 'string' ||
    typeof imageUrl !== 'string' ||
    (badge !== undefined && badge !== null && typeof badge !== 'string')
  ) {
    res.status(400).json({ error: 'Invalid product fields' });
    return;
  }

  try {
    const product = await createProduct(
      name,
      price,
      category,
      subcategory,
      imageUrl,
      badge ?? null
    );
    res.status(201).json({ product });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    if (
      message === 'Product text fields cannot be empty' ||
      message === 'Product price must be a non-negative number' ||
      message === 'Invalid product badge'
    ) {
      res.status(400).json({ error: message });
      return;
    }

    console.error('Failed to create product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function editProduct(req: Request, res: Response): Promise<void> {
  const id = parseInt(req.params.id as string, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid product ID' });
    return;
  }

  const { name, price, category, subcategory, image_url: imageUrl, badge } = req.body;

  if (
    typeof name !== 'string' ||
    typeof price !== 'number' ||
    typeof category !== 'string' ||
    typeof subcategory !== 'string' ||
    typeof imageUrl !== 'string' ||
    (badge !== undefined && badge !== null && typeof badge !== 'string')
  ) {
    res.status(400).json({ error: 'Invalid product fields' });
    return;
  }

  try {
    const product = await updateProduct(
      id,
      name,
      price,
      category,
      subcategory,
      imageUrl,
      badge ?? null
    );
    res.status(200).json({ product });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    if (
      message === 'Product text fields cannot be empty' ||
      message === 'Product price must be a non-negative number' ||
      message === 'Invalid product badge'
    ) {
      res.status(400).json({ error: message });
      return;
    }

    if (message === 'Product not found') {
      res.status(404).json({ error: message });
      return;
    }

    console.error('Failed to update product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function removeProduct(req: Request, res: Response): Promise<void> {
  const id = parseInt(req.params.id as string, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid product ID' });
    return;
  }

  try {
    await deleteProduct(id);
    res.status(204).send();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    if (message === 'Product not found') {
      res.status(404).json({ error: message });
      return;
    }

    console.error('Failed to delete product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
