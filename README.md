# NovaShop - MERN E-Commerce Platform

A full-featured e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js) featuring user authentication, admin dashboard, product management, shopping cart, wishlist, and Razorpay payment integration.

## 🚀 Features

### User Features
- **Authentication**: Email/Password login and Google OAuth
- **Product Browsing**: Browse products with filters, search, and sorting
- **Shopping Cart**: Add, update, remove items with real-time total calculation
- **Wishlist**: Save favorite products for later
- **Checkout**: Secure payment processing with Razorpay
- **Order Tracking**: View order history and status
- **Profile Management**: Update personal information and address

### Admin Features
- **Dashboard**: Overview of products, orders, and revenue
- **Category Management**: Full CRUD operations for categories
- **Product Management**: Create/edit products with rich descriptions, specifications, and images
- **Order Management**: View all orders and update order status
- **Stock Management**: Automatic stock deduction on successful orders

## 🛠️ Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- Passport (Google OAuth)
- Razorpay Payment Gateway
- bcryptjs for password hashing

**Frontend:**
- React 18
- Vite (Build tool)
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- React Quill (Rich text editor)
- Lucide React (Icons)

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Razorpay Account (for payment integration)
- Google OAuth Credentials (optional, for social login)

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd E-commerce
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/novashop

# JWT Secret (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Razorpay (Get test keys from https://dashboard.razorpay.com/)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Session Secret
SESSION_SECRET=your_session_secret_key
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Seed the Database

```bash
cd backend
npm run seed
```

This will create:
- 1 admin user (email: `admin@novashop.com`, password: `admin123`)
- 6 product categories
- 25 sample products with images and specifications

### 5. Run the Application

**Start Backend Server:**
```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

Backend will run on `http://localhost:5000`

**Start Frontend Server:**
```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

## 👤 Default Admin Credentials

```
Email: admin@novashop.com
Password: admin123
```

## 🔑 Getting Razorpay Test Keys

1. Sign up at [Razorpay](https://dashboard.razorpay.com/)
2. Go to Settings → API Keys
3. Generate Test Keys
4. Copy `Key ID` and `Key Secret` to your `.env` file

**Test Card Details:**
- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

## 🔑 Getting Google OAuth Credentials (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
6. Copy Client ID and Client Secret to your `.env` file

## 📁 Project Structure

```
E-commerce/
├── backend/
│   ├── config/
│   │   ├── passport.js
│   │   └── razorpay.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── wishlistController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Category.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   ├── Wishlist.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── wishlistRoutes.js
│   │   └── orderRoutes.js
│   ├── scripts/
│   │   └── seed.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ui/
    │   │   ├── admin/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── AdminRoute.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── CartContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Shop.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Wishlist.jsx
    │   │   ├── Checkout.jsx
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   └── admin/
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## 🎨 Features Walkthrough

### User Journey
1. **Browse Products**: Visit home page to see featured products and categories
2. **Search & Filter**: Use shop page to filter by category, price, search, and sort
3. **Product Details**: View full product information, specifications, and images
4. **Add to Cart**: Add products to cart with quantity selection
5. **Wishlist**: Save products for later
6. **Checkout**: Enter shipping address and complete payment via Razorpay
7. **Track Orders**: View order history and current status

### Admin Journey
1. **Login**: Use admin credentials to access admin dashboard
2. **Manage Categories**: Create, edit, delete product categories
3. **Manage Products**: Add products with rich descriptions, specs, and multiple images
4. **View Orders**: See all customer orders with filtering options
5. **Update Status**: Change order status (Pending → Confirmed → Shipped → Delivered)

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes with middleware
- Role-based access control (USER/ADMIN)
- Razorpay payment signature verification
- Input validation and sanitization
- CORS configuration

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/password` - Change password
- `GET /api/auth/google` - Google OAuth login

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add to cart
- `PUT /api/cart/update` - Update quantity
- `DELETE /api/cart/remove/:productId` - Remove from cart

### Wishlist
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist/add` - Add to wishlist
- `DELETE /api/wishlist/remove/:productId` - Remove from wishlist

### Orders
- `POST /api/orders/create` - Create Razorpay order
- `POST /api/orders/verify` - Verify payment
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `GET /api/orders/all/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running locally or check your Atlas connection string
- Verify `MONGODB_URI` in `.env` file

**Razorpay Payment Fails:**
- Use test mode keys from Razorpay dashboard
- Use test card: `4111 1111 1111 1111`

**Google OAuth Not Working:**
- Verify redirect URI matches exactly in Google Console
- Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`

**Port Already in Use:**
- Change `PORT` in backend `.env` file
- Update proxy in `frontend/vite.config.js` if backend port changes

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

---

**Built with ❤️ using MERN Stack**
