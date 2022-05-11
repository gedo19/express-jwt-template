import { Router } from 'express';
import authController from './auth.controller.js';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/register',
  body('data.email').isEmail().normalizeEmail(),
  body('data.password').isLength({ min: 3 }),
  authController.registerUser,
);

router.post('/login', authController.loginUser);

router.get('/logout', authController.logoutUser);

router.get('/refresh', authController.refreshTokens);

export default router;
