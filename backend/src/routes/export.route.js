import express from 'express';
import exportController from '../controllers/export.controller.js';
import { protectRoute } from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/', protectRoute, exportController.exportUsersController);

export default router;
