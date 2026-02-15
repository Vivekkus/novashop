import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import { Search, SlidersHorizontal } from 'lucide-react';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const sort = searchParams.get('sort') || '';

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [search, category, sort]);

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/categories');
            setCategories(data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const params = {};
            if (search) params.search = search;
            if (category) params.category = category;
            if (sort) params.sort = sort;

            const { data } = await api.get('/products', { params });
            setProducts(data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchValue = formData.get('search');
        setSearchParams({ ...Object.fromEntries(searchParams), search: searchValue });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Search and Filters */}
            <div className="mb-8">
                <form onSubmit={handleSearch} className="flex gap-4 mb-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            name="search"
                            defaultValue={search}
                            placeholder="Search products..."
                            className="input pl-10"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>

                <div className="flex flex-wrap gap-4">
                    <select
                        value={category}
                        onChange={(e) => setSearchParams({ ...Object.fromEntries(searchParams), category: e.target.value })}
                        className="input w-auto"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>

                    <select
                        value={sort}
                        onChange={(e) => setSearchParams({ ...Object.fromEntries(searchParams), sort: e.target.value })}
                        className="input w-auto"
                    >
                        <option value="">Sort By</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="name-asc">Name: A-Z</option>
                    </select>
                </div>
            </div>

            {/* Products Grid */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="spinner"></div>
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No products found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
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
                                <p className="text-sm text-gray-600 mt-2">
                                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Shop;
