import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, Search, LogOut, Package } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { user, isAdmin, logout } = useAuth();
    const { getCartCount } = useCart();

    const cartCount = getCartCount();

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg"></div>
                        <span className="text-2xl font-bold gradient-text">NovaShop</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-primary-600 transition">Home</Link>
                        <Link to="/shop" className="text-gray-700 hover:text-primary-600 transition">Shop</Link>
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition">
                                    <ShoppingCart className="w-6 h-6 text-gray-700" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                <Link to="/wishlist" className="p-2 hover:bg-gray-100 rounded-lg transition">
                                    <Heart className="w-6 h-6 text-gray-700" />
                                </Link>

                                {/* User Menu */}
                                <div className="relative">
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition"
                                    >
                                        <User className="w-6 h-6 text-gray-700" />
                                        <span className="hidden md:block text-sm font-medium">{user.name}</span>
                                    </button>

                                    {userMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                Profile
                                            </Link>
                                            <Link
                                                to="/my-orders"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                My Orders
                                            </Link>
                                            {isAdmin && (
                                                <Link
                                                    to="/admin/dashboard"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => setUserMenuOpen(false)}
                                                >
                                                    Admin Dashboard
                                                </Link>
                                            )}
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setUserMenuOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link to="/login" className="btn btn-outline text-sm">Login</Link>
                                <Link to="/signup" className="btn btn-primary text-sm">Sign Up</Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t">
                        <Link
                            to="/"
                            className="block py-2 text-gray-700 hover:text-primary-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/shop"
                            className="block py-2 text-gray-700 hover:text-primary-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Shop
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
