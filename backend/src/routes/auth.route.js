import express from 'express';
import authController from '../controllers/auth.controller.js';
import validation from '../validations/auth.validation.js';
import { protectRoute } from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/login', validation.createUserValidation, authController.login);
router.get('/me', protectRoute, authController.tetsLogin);

export default router;
