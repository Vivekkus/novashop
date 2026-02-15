import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);

            toast.success('Login successful!');
            return data;
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            toast.error(message);
            throw error;
        }
    };

    const signup = async (name, email, password) => {
        try {
            const { data } = await api.post('/auth/signup', { name, email, password });

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);

            toast.success('Account created successfully!');
            return data;
        } catch (error) {
            const message = error.response?.data?.message || 'Signup failed';
            toast.error(message);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        toast.success('Logged out successfully');
    };

    const updateProfile = async (profileData) => {
        try {
            const { data } = await api.put('/auth/profile', profileData);

            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);

            toast.success('Profile updated successfully!');
            return data;
        } catch (error) {
            const message = error.response?.data?.message || 'Update failed';
            toast.error(message);
            throw error;
        }
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        updateProfile,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN'
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
