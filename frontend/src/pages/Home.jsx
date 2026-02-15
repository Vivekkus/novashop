import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { ArrowRight, Star } from 'lucide-react';

const Home = () => {
    const [featured, setFeatured] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [featuredRes, categoriesRes] = await Promise.all([
                api.get('/products/featured'),
                api.get('/categories')
            ]);
            setFeatured(featuredRes.data.products);
            setCategories(categoriesRes.data.categories);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Welcome to NovaShop
                        </h1>
                        <p className="text-xl mb-8 text-primary-100">
                            Discover amazing products at unbeatable prices
                        </p>
                        <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                            Shop Now <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((category) => (
                            <Link
                                key={category._id}
                                to={`/shop?category=${category._id}`}
                                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition card-hover"
                            >
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-32 object-cover rounded-lg mb-4"
                                />
                                <h3 className="font-semibold">{category.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featured.map((product) => (
                            <Link
                                key={product._id}
                                to={`/product/${product._id}`}
                                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition card-hover"
                            >
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                                    <div className="flex items-center gap-2">
                                        {product.discountPrice ? (
                                            <>
                                                <span className="text-lg font-bold text-primary-600">
                                                    ₹{product.discountPrice}
                                                </span>
                                                <span className="text-sm text-gray-500 line-through">
                                                    ₹{product.price}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-lg font-bold text-primary-600">
                                                ₹{product.price}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1 mt-2">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm text-gray-600">4.5 (120)</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
