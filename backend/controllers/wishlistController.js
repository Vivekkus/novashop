import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
            path: 'products',
            select: 'name price discountPrice images stock'
        });

        if (!wishlist) {
            wishlist = await Wishlist.create({ user: req.user._id, products: [] });
        }

        res.json({
            success: true,
            wishlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching wishlist',
            error: error.message
        });
    }
};

// @desc    Add product to wishlist
// @route   POST /api/wishlist/add
// @access  Private
export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required'
            });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        let wishlist = await Wishlist.findOne({ user: req.user._id });

        if (!wishlist) {
            wishlist = await Wishlist.create({
                user: req.user._id,
                products: [productId]
            });
        } else {
            // Check if product already in wishlist
            if (wishlist.products.includes(productId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Product already in wishlist'
                });
            }

            wishlist.products.push(productId);
            await wishlist.save();
        }

        await wishlist.populate({
            path: 'products',
            select: 'name price discountPrice images stock'
        });

        res.json({
            success: true,
            message: 'Product added to wishlist',
            wishlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding to wishlist',
            error: error.message
        });
    }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/remove/:productId
// @access  Private
export const removeFromWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user._id });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: 'Wishlist not found'
            });
        }

        wishlist.products = wishlist.products.filter(
            product => product.toString() !== req.params.productId
        );

        await wishlist.save();

        await wishlist.populate({
            path: 'products',
            select: 'name price discountPrice images stock'
        });

        res.json({
            success: true,
            message: 'Product removed from wishlist',
            wishlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error removing from wishlist',
            error: error.message
        });
    }
};
