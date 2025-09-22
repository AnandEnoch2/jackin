import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  getOrders,
  updateOrderStatus
} from '../controllers/orderController.js';

const router = express.Router();

router.route('/')
  .get(protect, admin, getOrders);

router.route('/:id/status')
  .put(protect, admin, updateOrderStatus);

export default router;