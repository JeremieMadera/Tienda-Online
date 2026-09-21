import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { requireAdmin } from '../middlewares/admin.middleware.js';
import { getMyOrdersHandler, getAllOrdersHandler } from '../controllers/order.controller.js';

const router = Router();

router.get('/', requireAuth, requireAdmin, getAllOrdersHandler);
router.get('/me', requireAuth, getMyOrdersHandler);

export default router;
