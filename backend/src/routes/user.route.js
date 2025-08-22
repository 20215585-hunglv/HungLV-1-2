import express from 'express';
import userController from '../controllers/user.controller.js';
import validation from '../validations/auth.validation.js';
import { requireRole } from '../middlewares/requireRole.js';
import { protectRoute } from '../middlewares/protectRoute.js';

const router = express.Router();

router.post(
  '/',
  validation.createUserValidation,
  userController.createUserController,
);
// router.get(
//   '/',
//   protectRoute,
//   requireRole(['admin']),
//   userController.getListUserController,
// );
router.get(
  '/:id',
  protectRoute,
  requireRole(['admin']),
  userController.getUserController,
);
router.put(
  '/:id',
  protectRoute,
  validation.updateUserValidation,
  userController.updateUserController,
);
router.delete(
  '/:id',
  protectRoute,
  requireRole(['user']),
  userController.deleteUserController,
);
router.get(
  '/domain/count',
  protectRoute,
  requireRole(['admin']),
  userController.countDomainUsersController,
);
router.get(
  '/domain/list',
  protectRoute,
  requireRole(['admin']),
  userController.findListUserByDomainController,
);
router.get(
  '/domain/migrate',
  protectRoute,
  requireRole(['admin']),
  userController.statisticsDomainController,
);
router.delete(
  '/domain/delete',
  protectRoute,
  requireRole(['admin']),
  userController.deleteUserByDomainAndOffsetController,
);
router.get(
  '/',
  // protectRoute,
  // requireRole(['admin']),
  userController.findUserByTimeController,
);
router.delete(
  '/offset/delete',
  protectRoute,
  requireRole(['admin']),
  userController.deleteUserByOffsetController,
);
router.get(
  '/domain/statistics/date',
  protectRoute,
  requireRole(['admin']),
  userController.statisticsByDateController,
);

router.get('/counter/test', userController.getOffsetController);

router.get(
  '/stats/domain',
  protectRoute,
  requireRole(['admin']),
  userController.getDomainStats,
);

export default router;
