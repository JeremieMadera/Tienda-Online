import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import {
  getCartHandler,
  addToCartHandler,
  updateCartItemHandler,
  removeFromCartHandler,
} from '../controllers/cart.controller.js';

const router = Router();

router.use(requireAuth); // all cart routes require auth

router.get('/', getCartHandler);
router.post('/', addToCartHandler);
router.patch('/:itemId', updateCartItemHandler);
router.delete('/:itemId', removeFromCartHandler);

export default router;
