import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

dotenv.config();

const categories = [
    {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Latest gadgets and electronic devices',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop'
    },
    {
        name: 'Fashion',
        slug: 'fashion',
        description: 'Trendy clothing and accessories',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop'
    },
    {
        name: 'Home & Kitchen',
        slug: 'home-kitchen',
        description: 'Everything for your home',
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop'
    },
    {
        name: 'Sports',
        slug: 'sports',
        description: 'Sports equipment and fitness gear',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop'
    },
    {
        name: 'Books',
        slug: 'books',
        description: 'Wide collection of books',
        image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop'
    },
    {
        name: 'Beauty',
        slug: 'beauty',
        description: 'Beauty and personal care products',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop'
    }
];

const products = [
    // Electronics
    {
        name: 'Wireless Headphones Pro',
        description: '<p>Premium wireless headphones with active noise cancellation. Experience crystal-clear audio with deep bass and crisp highs. Perfect for music lovers and professionals.</p><p>Features advanced Bluetooth 5.0 technology for seamless connectivity up to 30 feet. Long-lasting battery provides up to 30 hours of playtime.</p>',
        price: 8999,
        discountPrice: 6999,
        stock: 50,
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Brand': 'AudioTech',
            'Color': 'Black',
            'Connectivity': 'Bluetooth 5.0',
            'Battery Life': '30 hours',
            'Weight': '250g',
            'Noise Cancellation': 'Active ANC'
        },
        featured: true
    },
    {
        name: 'Smart Watch Ultra',
        description: '<p>Advanced smartwatch with health tracking, GPS, and water resistance. Monitor your heart rate, sleep patterns, and daily activity with precision.</p><p>Compatible with both iOS and Android devices. Features a vibrant AMOLED display and customizable watch faces.</p>',
        price: 15999,
        discountPrice: 12999,
        stock: 30,
        images: [
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Brand': 'TechWear',
            'Display': '1.4" AMOLED',
            'Water Resistance': '5 ATM',
            'Battery': '7 days',
            'GPS': 'Built-in',
            'Compatibility': 'iOS & Android'
        },
        featured: true
    },
    {
        name: 'Laptop Stand Aluminum',
        description: '<p>Ergonomic laptop stand made from premium aluminum. Improve your posture and reduce neck strain with this adjustable stand.</p><p>Compatible with all laptop sizes from 10" to 17". Features anti-slip silicone pads and excellent heat dissipation.</p>',
        price: 2499,
        discountPrice: 1799,
        stock: 100,
        images: [
            'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Material': 'Aluminum Alloy',
            'Color': 'Silver',
            'Adjustable Height': 'Yes',
            'Max Load': '5 kg',
            'Compatibility': '10-17 inch laptops'
        },
        featured: false
    },
    {
        name: 'Mechanical Keyboard RGB',
        description: '<p>Professional mechanical keyboard with customizable RGB lighting. Features tactile switches for the perfect typing experience.</p><p>Durable construction with aluminum frame. Programmable keys and dedicated media controls.</p>',
        price: 5999,
        discountPrice: 4499,
        stock: 45,
        images: [
            'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Switch Type': 'Mechanical Blue',
            'Backlighting': 'RGB',
            'Connection': 'USB-C',
            'Keys': '104',
            'Material': 'Aluminum Frame'
        },
        featured: true
    },
    // Fashion
    {
        name: 'Classic Leather Jacket',
        description: '<p>Timeless leather jacket crafted from genuine leather. Perfect for any season and occasion.</p><p>Features multiple pockets, YKK zippers, and a comfortable inner lining. Available in classic black color.</p>',
        price: 12999,
        discountPrice: 9999,
        stock: 25,
        images: [
            'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Material': 'Genuine Leather',
            'Color': 'Black',
            'Sizes': 'S, M, L, XL',
            'Closure': 'Zipper',
            'Care': 'Professional Clean Only'
        },
        featured: true
    },
    {
        name: 'Designer Sunglasses',
        description: '<p>Stylish sunglasses with UV400 protection. Protect your eyes in style with these premium shades.</p><p>Lightweight frame with polarized lenses. Comes with protective case and cleaning cloth.</p>',
        price: 3999,
        discountPrice: 2999,
        stock: 60,
        images: [
            'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Frame Material': 'Acetate',
            'Lens': 'Polarized',
            'UV Protection': 'UV400',
            'Color': 'Tortoise Shell',
            'Includes': 'Case & Cloth'
        },
        featured: false
    },
    {
        name: 'Running Shoes Pro',
        description: '<p>High-performance running shoes designed for comfort and speed. Advanced cushioning technology for maximum support.</p><p>Breathable mesh upper and durable rubber outsole. Perfect for daily runs and marathons.</p>',
        price: 6999,
        discountPrice: 5499,
        stock: 40,
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Brand': 'SportMax',
            'Type': 'Running',
            'Sizes': '6-12',
            'Color': 'Black/White',
            'Technology': 'Air Cushion',
            'Weight': '280g'
        },
        featured: true
    },
    {
        name: 'Casual Backpack',
        description: '<p>Versatile backpack perfect for daily use, travel, or school. Multiple compartments for organized storage.</p><p>Water-resistant material with padded laptop sleeve. Comfortable padded straps and back panel.</p>',
        price: 2999,
        discountPrice: 2299,
        stock: 70,
        images: [
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Capacity': '25L',
            'Material': 'Polyester',
            'Laptop Sleeve': 'Up to 15.6"',
            'Color': 'Navy Blue',
            'Pockets': '5',
            'Water Resistant': 'Yes'
        },
        featured: false
    },
    // Home & Kitchen
    {
        name: 'Coffee Maker Deluxe',
        description: '<p>Premium coffee maker with programmable timer and auto-shutoff. Brew the perfect cup every morning.</p><p>12-cup capacity with pause-and-serve function. Includes permanent filter and glass carafe.</p>',
        price: 4999,
        discountPrice: 3999,
        stock: 35,
        images: [
            'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Capacity': '12 cups',
            'Power': '900W',
            'Features': 'Programmable Timer',
            'Color': 'Stainless Steel',
            'Auto Shutoff': 'Yes'
        },
        featured: true
    },
    {
        name: 'Non-Stick Cookware Set',
        description: '<p>Complete 10-piece cookware set with premium non-stick coating. Includes pots, pans, and lids.</p><p>Even heat distribution and easy cleaning. Oven safe up to 350°F. Dishwasher safe.</p>',
        price: 8999,
        discountPrice: 6999,
        stock: 20,
        images: [
            'https://images.unsplash.com/photo-1584990347449-39b4aa02c3d5?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Pieces': '10',
            'Material': 'Aluminum',
            'Coating': 'Non-Stick',
            'Oven Safe': 'Up to 350°F',
            'Dishwasher Safe': 'Yes'
        },
        featured: false
    },
    {
        name: 'Blender Pro 2000',
        description: '<p>Powerful blender with 2000W motor. Perfect for smoothies, soups, and more.</p><p>Variable speed control and pulse function. BPA-free pitcher with 2L capacity.</p>',
        price: 5999,
        discountPrice: 4799,
        stock: 30,
        images: [
            'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Power': '2000W',
            'Capacity': '2L',
            'Speeds': 'Variable',
            'Material': 'BPA-Free',
            'Functions': 'Blend, Pulse, Ice Crush'
        },
        featured: true
    },
    {
        name: 'Vacuum Cleaner Cordless',
        description: '<p>Lightweight cordless vacuum with powerful suction. Clean your entire home with ease.</p><p>Up to 60 minutes runtime. HEPA filtration and LED display. Multiple attachments included.</p>',
        price: 14999,
        discountPrice: 11999,
        stock: 15,
        images: [
            'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Type': 'Cordless Stick',
            'Runtime': '60 minutes',
            'Filtration': 'HEPA',
            'Weight': '2.5kg',
            'Attachments': '5 included'
        },
        featured: true
    },
    // Sports
    {
        name: 'Yoga Mat Premium',
        description: '<p>Extra thick yoga mat for ultimate comfort. Non-slip surface for safe practice.</p><p>Eco-friendly TPE material. Includes carrying strap. Perfect for yoga, pilates, and stretching.</p>',
        price: 1999,
        discountPrice: 1499,
        stock: 80,
        images: [
            'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Thickness': '6mm',
            'Material': 'TPE',
            'Size': '183cm x 61cm',
            'Color': 'Purple',
            'Non-Slip': 'Yes',
            'Eco-Friendly': 'Yes'
        },
        featured: false
    },
    {
        name: 'Dumbbell Set Adjustable',
        description: '<p>Adjustable dumbbell set from 5kg to 25kg per hand. Space-saving design for home gym.</p><p>Quick-adjust dial system. Includes storage tray. Durable construction.</p>',
        price: 12999,
        discountPrice: 9999,
        stock: 25,
        images: [
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Weight Range': '5-25kg per hand',
            'Material': 'Steel & Rubber',
            'Adjustment': 'Dial System',
            'Includes': 'Storage Tray',
            'Total Weight': '50kg'
        },
        featured: true
    },
    {
        name: 'Resistance Bands Set',
        description: '<p>Complete resistance bands set with 5 different resistance levels. Perfect for strength training and rehabilitation.</p><p>Includes door anchor, handles, and ankle straps. Portable and versatile.</p>',
        price: 1499,
        discountPrice: 999,
        stock: 100,
        images: [
            'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Bands': '5 levels',
            'Material': 'Latex',
            'Resistance': '10-50 lbs',
            'Includes': 'Handles, Anchor, Straps',
            'Portable': 'Yes'
        },
        featured: false
    },
    {
        name: 'Cycling Helmet Pro',
        description: '<p>Lightweight cycling helmet with advanced ventilation. Maximum protection and comfort.</p><p>Adjustable fit system. Reflective elements for visibility. Meets safety standards.</p>',
        price: 3499,
        discountPrice: 2799,
        stock: 40,
        images: [
            'https://images.unsplash.com/photo-1557838923-2985c318be48?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Weight': '280g',
            'Sizes': 'S, M, L',
            'Ventilation': '18 vents',
            'Safety': 'CE Certified',
            'Color': 'Matte Black'
        },
        featured: false
    },
    // Books
    {
        name: 'The Art of Programming',
        description: '<p>Comprehensive guide to modern programming practices. Perfect for beginners and experienced developers.</p><p>Covers multiple languages and paradigms. Includes practical examples and exercises.</p>',
        price: 899,
        discountPrice: 699,
        stock: 50,
        images: [
            'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Pages': '450',
            'Author': 'John Smith',
            'Publisher': 'Tech Books',
            'Language': 'English',
            'Format': 'Paperback',
            'ISBN': '978-1234567890'
        },
        featured: true
    },
    {
        name: 'Mindfulness & Meditation',
        description: '<p>Learn the art of mindfulness and meditation. Transform your life with these proven techniques.</p><p>Includes guided exercises and daily practices. Written by renowned meditation teacher.</p>',
        price: 599,
        discountPrice: 449,
        stock: 60,
        images: [
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Pages': '280',
            'Author': 'Sarah Johnson',
            'Publisher': 'Wellness Press',
            'Language': 'English',
            'Format': 'Hardcover'
        },
        featured: false
    },
    {
        name: 'Cookbook: Healthy Meals',
        description: '<p>Collection of 100+ healthy and delicious recipes. Easy to follow with beautiful photography.</p><p>Includes nutritional information and meal prep tips. Perfect for busy lifestyles.</p>',
        price: 799,
        discountPrice: 599,
        stock: 45,
        images: [
            'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Pages': '320',
            'Recipes': '100+',
            'Author': 'Chef Maria',
            'Publisher': 'Food & Life',
            'Format': 'Hardcover',
            'Photos': 'Full Color'
        },
        featured: true
    },
    {
        name: 'Business Strategy Guide',
        description: '<p>Essential guide for entrepreneurs and business leaders. Learn proven strategies for success.</p><p>Case studies from top companies. Practical frameworks and tools.</p>',
        price: 1299,
        discountPrice: 999,
        stock: 35,
        images: [
            'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Pages': '380',
            'Author': 'David Brown',
            'Publisher': 'Business Books',
            'Language': 'English',
            'Format': 'Paperback'
        },
        featured: false
    },
    // Beauty
    {
        name: 'Skincare Set Premium',
        description: '<p>Complete skincare routine with cleanser, toner, serum, and moisturizer. Suitable for all skin types.</p><p>Natural ingredients. Dermatologist tested. Cruelty-free and vegan.</p>',
        price: 4999,
        discountPrice: 3999,
        stock: 40,
        images: [
            'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Products': '4 piece set',
            'Skin Type': 'All types',
            'Ingredients': 'Natural',
            'Cruelty-Free': 'Yes',
            'Vegan': 'Yes'
        },
        featured: true
    },
    {
        name: 'Hair Dryer Professional',
        description: '<p>Salon-quality hair dryer with ionic technology. Fast drying with less damage.</p><p>Multiple heat and speed settings. Cool shot button. Includes concentrator and diffuser.</p>',
        price: 3999,
        discountPrice: 2999,
        stock: 30,
        images: [
            'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Power': '2000W',
            'Technology': 'Ionic',
            'Settings': '3 heat, 2 speed',
            'Attachments': '2 included',
            'Weight': '450g'
        },
        featured: false
    },
    {
        name: 'Makeup Brush Set',
        description: '<p>Professional makeup brush set with 12 essential brushes. Soft synthetic bristles.</p><p>Includes face and eye brushes. Comes with elegant storage case. Perfect for all makeup looks.</p>',
        price: 2499,
        discountPrice: 1799,
        stock: 55,
        images: [
            'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Brushes': '12 pieces',
            'Bristles': 'Synthetic',
            'Includes': 'Storage Case',
            'Cruelty-Free': 'Yes',
            'Color': 'Rose Gold'
        },
        featured: true
    },
    {
        name: 'Perfume Luxury Collection',
        description: '<p>Exquisite fragrance with notes of jasmine, vanilla, and sandalwood. Long-lasting scent.</p><p>100ml bottle. Elegant packaging. Perfect gift for special occasions.</p>',
        price: 5999,
        discountPrice: 4499,
        stock: 25,
        images: [
            'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Volume': '100ml',
            'Notes': 'Jasmine, Vanilla, Sandalwood',
            'Type': 'Eau de Parfum',
            'Longevity': '8-10 hours',
            'Gender': 'Unisex'
        },
        featured: true
    },
    {
        name: 'Face Mask Set',
        description: '<p>Variety pack of 10 sheet masks for different skin concerns. Hydrating, brightening, and anti-aging.</p><p>Natural extracts. Suitable for sensitive skin. Use 2-3 times per week.</p>',
        price: 999,
        discountPrice: 749,
        stock: 70,
        images: [
            'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop'
        ],
        specifications: {
            'Masks': '10 pieces',
            'Types': 'Hydrating, Brightening, Anti-aging',
            'Ingredients': 'Natural Extracts',
            'Suitable For': 'All skin types',
            'Paraben-Free': 'Yes'
        },
        featured: false
    }
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/novashop');
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Category.deleteMany({});
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Create admin user
        const admin = await User.create({
            name: 'Admin',
            email: 'admin@novashop.com',
            password: 'admin123',
            role: 'ADMIN'
        });
        console.log('👤 Admin user created');

        // Create categories
        const createdCategories = await Category.insertMany(categories);
        console.log(`📁 Created ${createdCategories.length} categories`);

        // Map category names to IDs
        const categoryMap = {};
        createdCategories.forEach(cat => {
            categoryMap[cat.name] = cat._id;
        });

        // Assign categories to products
        const productsWithCategories = [
            ...products.slice(0, 4).map(p => ({ ...p, category: categoryMap['Electronics'] })),
            ...products.slice(4, 8).map(p => ({ ...p, category: categoryMap['Fashion'] })),
            ...products.slice(8, 12).map(p => ({ ...p, category: categoryMap['Home & Kitchen'] })),
            ...products.slice(12, 16).map(p => ({ ...p, category: categoryMap['Sports'] })),
            ...products.slice(16, 20).map(p => ({ ...p, category: categoryMap['Books'] })),
            ...products.slice(20, 25).map(p => ({ ...p, category: categoryMap['Beauty'] }))
        ];

        // Create products
        const createdProducts = [];
        for (const product of productsWithCategories) {
            const created = await Product.create(product);
            createdProducts.push(created);
        }
        console.log(`📦 Created ${createdProducts.length} products`);

        console.log('\n✨ Database seeded successfully!');
        console.log('\n📝 Admin Credentials:');
        console.log('   Email: admin@novashop.com');
        console.log('   Password: admin123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
