import Product from '../models/Product.js';

// @desc    Get all products with filters
// @route   GET /api/products
// @access  Public
export const getAllProducts = async (req, res) => {
    try {
        const { category, search, minPrice, maxPrice, sort, page = 1, limit = 12 } = req.query;

        // Build query
        const query = {};

        if (category) {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Sort options
        let sortOption = { createdAt: -1 }; // Default: newest first
        if (sort === 'price-asc') sortOption = { price: 1 };
        if (sort === 'price-desc') sortOption = { price: -1 };
        if (sort === 'name-asc') sortOption = { name: 1 };
        if (sort === 'name-desc') sortOption = { name: -1 };

        // Pagination
        const skip = (page - 1) * limit;

        const products = await Product.find(query)
            .populate('category', 'name slug')
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit));

        const total = await Product.countDocuments(query);

        res.json({
            success: true,
            count: products.length,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res) => {
    try {
        const products = await Product.find({ featured: true })
            .populate('category', 'name slug')
            .limit(8)
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching featured products',
            error: error.message
        });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name slug');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            stock,
            category,
            images,
            specifications,
            featured
        } = req.body;

        // Validation
        if (!name || !description || !price || !stock || !category) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Check if product already exists
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: 'Product with this name already exists'
            });
        }

        const product = await Product.create({
            name,
            description,
            price,
            discountPrice,
            stock,
            category,
            images: images || [],
            specifications: specifications || {},
            featured: featured || false
        });

        await product.populate('category', 'name slug');

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: error.message
        });
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        const {
            name,
            description,
            price,
            discountPrice,
            stock,
            category,
            images,
            specifications,
            featured
        } = req.body;

        // Check if new name already exists (excluding current product)
        if (name && name !== product.name) {
            const existingProduct = await Product.findOne({ name });
            if (existingProduct) {
                return res.status(400).json({
                    success: false,
                    message: 'Product name already exists'
                });
            }
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price !== undefined ? price : product.price;
        product.discountPrice = discountPrice !== undefined ? discountPrice : product.discountPrice;
        product.stock = stock !== undefined ? stock : product.stock;
        product.category = category || product.category;
        product.images = images || product.images;
        product.specifications = specifications || product.specifications;
        product.featured = featured !== undefined ? featured : product.featured;

        await product.save();
        await product.populate('category', 'name slug');

        res.json({
            success: true,
            message: 'Product updated successfully',
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        await product.deleteOne();

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error.message
        });
    }
};
