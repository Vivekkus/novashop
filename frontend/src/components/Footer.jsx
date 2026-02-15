import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-white text-xl font-bold mb-4">NovaShop</h3>
                        <p className="text-sm">Your premium e-commerce destination for quality products.</p>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="hover:text-primary-400 transition">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-primary-400 transition">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-primary-400 transition">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-primary-400 transition">Home</Link></li>
                            <li><Link to="/shop" className="hover:text-primary-400 transition">Shop</Link></li>
                            <li><Link to="/cart" className="hover:text-primary-400 transition">Cart</Link></li>
                            <li><Link to="/my-orders" className="hover:text-primary-400 transition">My Orders</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Customer Service</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-primary-400 transition">Contact Us</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition">Shipping Policy</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition">Returns & Exchanges</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Newsletter</h4>
                        <p className="text-sm mb-4">Subscribe to get special offers and updates.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
                            />
                            <button className="bg-primary-600 px-4 py-2 rounded-r-lg hover:bg-primary-700 transition">
                                <Mail className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} NovaShop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
