import { Router } from 'express';
import { addProduct, listProducts, editProduct, removeProduct } from '../controllers/product.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { requireAdmin } from '../middlewares/admin.middleware.js';

const router = Router();

router.get('/', listProducts);
router.post('/', requireAuth, requireAdmin, addProduct);
router.patch('/:id', requireAuth, requireAdmin, editProduct);
router.delete('/:id', requireAuth, requireAdmin, removeProduct);

export default router;
