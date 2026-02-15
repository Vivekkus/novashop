import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import razorpay from '../config/razorpay.js';
import crypto from 'crypto';

// @desc    Create Razorpay order
// @route   POST /api/orders/create
// @access  Private
export const createRazorpayOrder = async (req, res) => {
    try {
        const { shippingAddress } = req.body;

        if (!shippingAddress || !shippingAddress.name || !shippingAddress.phone ||
            !shippingAddress.street || !shippingAddress.city || !shippingAddress.state ||
            !shippingAddress.zip || !shippingAddress.country) {
            return res.status(400).json({
                success: false,
                message: 'Please provide complete shipping address'
            });
        }

        // Get user cart
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Cart is empty'
            });
        }

        // Calculate total and validate stock
        let total = 0;
        for (const item of cart.items) {
            if (!item.product) {
                return res.status(400).json({
                    success: false,
                    message: 'Some products in cart are no longer available'
                });
            }

            if (item.product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${item.product.name}`
                });
            }

            const price = item.product.discountPrice || item.product.price;
            total += price * item.quantity;
        }

        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(total * 100), // Amount in paise
            currency: 'INR',
            receipt: `order_${Date.now()}`
        });

        // Create order in database
        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.discountPrice || item.product.price
        }));

        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            total,
            razorpayOrderId: razorpayOrder.id,
            shippingAddress,
            status: 'Pending'
        });

        res.json({
            success: true,
            orderId: order._id,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            keyId: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
};

// @desc    Verify payment and update order
// @route   POST /api/orders/verify
// @access  Private
export const verifyPayment = async (req, res) => {
    try {
        const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = req.body;

        if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !orderId) {
            return res.status(400).json({
                success: false,
                message: 'Missing payment verification data'
            });
        }

        // Verify signature
        const body = razorpayOrderId + '|' + razorpayPaymentId;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature !== razorpaySignature) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payment signature'
            });
        }

        // Update order
        const order = await Order.findById(orderId).populate('items.product');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized'
            });
        }

        order.razorpayPaymentId = razorpayPaymentId;
        order.razorpaySignature = razorpaySignature;
        order.status = 'Confirmed';

        await order.save();

        // Deduct stock
        for (const item of order.items) {
            const product = await Product.findById(item.product);
            if (product) {
                product.stock -= item.quantity;
                await product.save();
            }
        }

        // Clear cart
        await Cart.findOneAndUpdate(
            { user: req.user._id },
            { items: [] }
        );

        res.json({
            success: true,
            message: 'Payment verified successfully',
            order
        });
    } catch (error) {
        console.error('Verify payment error:', error);
        res.status(500).json({
            success: false,
            message: 'Error verifying payment',
            error: error.message
        });
    }
};

// @desc    Get user orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('items.product', 'name images')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('items.product', 'name images price discountPrice')
            .populate('user', 'name email');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Check if user owns the order or is admin
        if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this order'
            });
        }

        res.json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching order',
            error: error.message
        });
    }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders/all
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;

        const query = {};
        if (status) {
            query.status = status;
        }

        const skip = (page - 1) * limit;

        const orders = await Order.find(query)
            .populate('user', 'name email')
            .populate('items.product', 'name images')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const total = await Order.countDocuments(query);

        res.json({
            success: true,
            count: orders.length,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const validStatuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        order.status = status;
        await order.save();

        res.json({
            success: true,
            message: 'Order status updated',
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating order status',
            error: error.message
        });
    }
};
