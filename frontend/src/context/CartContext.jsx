import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        } else {
            setCart(null);
        }
    }, [isAuthenticated]);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/cart');
            setCart(data.cart);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        try {
            const { data } = await api.post('/cart/add', { productId, quantity });
            setCart(data.cart);
            toast.success('Added to cart!');
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to add to cart';
            toast.error(message);
            throw error;
        }
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            const { data } = await api.put('/cart/update', { productId, quantity });
            setCart(data.cart);
            toast.success('Cart updated!');
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to update cart';
            toast.error(message);
            throw error;
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const { data } = await api.delete(`/cart/remove/${productId}`);
            setCart(data.cart);
            toast.success('Removed from cart!');
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to remove from cart';
            toast.error(message);
            throw error;
        }
    };

    const clearCart = async () => {
        try {
            const { data } = await api.delete('/cart/clear');
            setCart(data.cart);
            toast.success('Cart cleared!');
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to clear cart';
            toast.error(message);
            throw error;
        }
    };

    const getCartTotal = () => {
        if (!cart || !cart.items) return 0;

        return cart.items.reduce((total, item) => {
            const price = item.product?.discountPrice || item.product?.price || 0;
            return total + (price * item.quantity);
        }, 0);
    };

    const getCartCount = () => {
        if (!cart || !cart.items) return 0;
        return cart.items.reduce((count, item) => count + item.quantity, 0);
    };

    const value = {
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchCart,
        getCartTotal,
        getCartCount
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
