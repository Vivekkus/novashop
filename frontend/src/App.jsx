import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import MyOrders from './pages/MyOrders';
import OrderDetail from './pages/OrderDetail';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminCategories from './pages/admin/Categories';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Protected Routes */}
                    <Route path="/cart" element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    } />
                    <Route path="/wishlist" element={
                        <ProtectedRoute>
                            <Wishlist />
                        </ProtectedRoute>
                    } />
                    <Route path="/checkout" element={
                        <ProtectedRoute>
                            <Checkout />
                        </ProtectedRoute>
                    } />
                    <Route path="/order-success" element={
                        <ProtectedRoute>
                            <OrderSuccess />
                        </ProtectedRoute>
                    } />
                    <Route path="/my-orders" element={
                        <ProtectedRoute>
                            <MyOrders />
                        </ProtectedRoute>
                    } />
                    <Route path="/order/:id" element={
                        <ProtectedRoute>
                            <OrderDetail />
                        </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    } />

                    {/* Admin Routes */}
                    <Route path="/admin/dashboard" element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    } />
                    <Route path="/admin/categories" element={
                        <AdminRoute>
                            <AdminCategories />
                        </AdminRoute>
                    } />
                    <Route path="/admin/products" element={
                        <AdminRoute>
                            <AdminProducts />
                        </AdminRoute>
                    } />
                    <Route path="/admin/orders" element={
                        <AdminRoute>
                            <AdminOrders />
                        </AdminRoute>
                    } />

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
