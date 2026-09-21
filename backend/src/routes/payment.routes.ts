import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { createPaymentIntentHandler } from '../controllers/payment.controller.js';
import { createOrderHandler } from '../controllers/order.controller.js';

const router = Router();

router.post('/create-intent', requireAuth, createPaymentIntentHandler);
router.post('/create-order', requireAuth, createOrderHandler);

export default router;
