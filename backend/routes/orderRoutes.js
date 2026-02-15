import express from 'express';
import {
    createRazorpayOrder,
    verifyPayment,
    getUserOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// User routes
router.post('/create', protect, createRazorpayOrder);
router.post('/verify', protect, verifyPayment);
router.get('/my-orders', protect, getUserOrders);
router.get('/:id', protect, getOrderById);

// Admin routes
router.get('/all/orders', protect, admin, getAllOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

export default router;
