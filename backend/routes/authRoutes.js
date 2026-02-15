import express from 'express';
import passport from 'passport';
import { body } from 'express-validator';
import {
    signup,
    login,
    getMe,
    updateProfile,
    changePassword,
    googleCallback,
    logout
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Validation middleware
const signupValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

// Regular auth routes
router.post('/signup', signupValidation, signup);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/password', protect, changePassword);
router.post('/logout', protect, logout);

// Google OAuth routes
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/login` }),
    googleCallback
);

export default router;
