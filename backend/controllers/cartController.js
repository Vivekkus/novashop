import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id }).populate({
            path: 'items.product',
            select: 'name price discountPrice images stock'
        });

        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
        }

        res.json({
            success: true,
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching cart',
            error: error.message
        });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required'
            });
        }

        // Check if product exists and has stock
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock'
            });
        }

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: [{ product: productId, quantity }]
            });
        } else {
            // Check if product already in cart
            const itemIndex = cart.items.findIndex(
                item => item.product.toString() === productId
            );

            if (itemIndex > -1) {
                // Update quantity
                const newQuantity = cart.items[itemIndex].quantity + quantity;

                if (product.stock < newQuantity) {
                    return res.status(400).json({
                        success: false,
                        message: 'Insufficient stock'
                    });
                }

                cart.items[itemIndex].quantity = newQuantity;
            } else {
                // Add new item
                cart.items.push({ product: productId, quantity });
            }

            await cart.save();
        }

        await cart.populate({
            path: 'items.product',
            select: 'name price discountPrice images stock'
        });

        res.json({
            success: true,
            message: 'Item added to cart',
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding to cart',
            error: error.message
        });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
// @access  Private
export const updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: 'Product ID and quantity are required'
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock'
            });
        }

        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Item not in cart'
            });
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();

        await cart.populate({
            path: 'items.product',
            select: 'name price discountPrice images stock'
        });

        res.json({
            success: true,
            message: 'Cart updated',
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating cart',
            error: error.message
        });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:productId
// @access  Private
export const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== req.params.productId
        );

        await cart.save();

        await cart.populate({
            path: 'items.product',
            select: 'name price discountPrice images stock'
        });

        res.json({
            success: true,
            message: 'Item removed from cart',
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error removing from cart',
            error: error.message
        });
    }
};

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        cart.items = [];
        await cart.save();

        res.json({
            success: true,
            message: 'Cart cleared',
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error clearing cart',
            error: error.message
        });
    }
};
