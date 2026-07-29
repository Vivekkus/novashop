
# 🛒 NovaShop - MERN E-Commerce Platform

NovaShop is a modern full-stack e-commerce platform built with the MERN Stack (MongoDB, Express.js, React, Node.js). It features JWT authentication, category and product management, shopping APIs, responsive UI, and an admin panel. The project is currently under active development.

## 🚀 Live Demo

**Frontend:** https://novashop-1-5o7x.onrender.com

**Backend API:** https://novashop-snxm.onrender.com

## ✨ Features

### User
- User Signup/Login (JWT)
- Browse Categories
- Browse Products
- Featured Products
- Product Search, Filter & Sort
- Protected Routes
- Responsive UI
- Profile Management
- Cart API
- Wishlist API

### Admin
- Admin Authentication
- Category CRUD APIs
- Product CRUD APIs
- Role-based Access
- Admin Dashboard Structure

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Express Validator
- Passport.js
- Express Session

## 📂 Project Structure

```
NovaShop/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   └── server.js
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

## ⚙ Installation

```bash
git clone https://github.com/Vivekkus/NovaShop.git
cd NovaShop
```

### Backend

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
SESSION_SECRET=your_session_secret

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### Frontend

```bash
cd frontend
npm install
```

### Run Backend

```bash
npm run dev
```

### Run Frontend

```bash
npm run dev
```

## 📦 Main API Routes

### Authentication
- POST `/api/auth/signup`
- POST `/api/auth/login`
- GET `/api/auth/me`
- PUT `/api/auth/profile`
- PUT `/api/auth/password`
- POST `/api/auth/logout`

### Products
- GET `/api/products`
- GET `/api/products/featured`
- GET `/api/products/:id`
- POST `/api/products`
- PUT `/api/products/:id`
- DELETE `/api/products/:id`

### Categories
- GET `/api/categories`
- POST `/api/categories`
- PUT `/api/categories/:id`
- DELETE `/api/categories/:id`

### Cart
- GET `/api/cart`
- POST `/api/cart/add`
- PUT `/api/cart/update`
- DELETE `/api/cart/remove/:productId`
- DELETE `/api/cart/clear`

### Wishlist
- GET `/api/wishlist`
- POST `/api/wishlist/add`
- DELETE `/api/wishlist/remove/:productId`

## 🚧 Current Status

### Completed
- JWT Authentication
- MongoDB Integration
- Product APIs
- Category APIs
- Signup/Login
- Featured Products
- Backend Cart APIs
- Backend Wishlist APIs
- Render Deployment

### In Progress
- Product Detail Page
- Cart UI
- Wishlist UI
- Checkout
- Orders
- Payment Integration
- Admin Pages

## 🔒 Security
- JWT Authentication
- Password Hashing
- Protected Routes
- Role-based Authorization
- Input Validation

## 💡 Future Improvements
- Product Reviews
- Ratings
- Coupons
- Email Verification
- Forgot Password
- Cloudinary Image Upload
- Order Tracking
- Analytics Dashboard
- Dark Mode

## 👨‍💻 Author

**Vivek Kushwaha**

GitHub: https://github.com/Vivekkus

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub.

## 📄 License

MIT License.

---
Built with ❤️ using MongoDB, Express.js, React, and Node.js.
