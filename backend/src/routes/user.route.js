import userController from '../controllers/user.controller.js';
import validation from '../validations/auth.validation.js';
import express from 'express';

const router = express.Router();

router.post(
  '/',
  validation.createUserValidation,
  userController.createUserController,
);
router.get('/', userController.getUserController);
router.put(
  '/:id',
  validation.updateUserValidation,
  userController.updateUserController,
);
router.delete('/', userController.deleteUserController);
router.get('/domain/count', userController.countDomainUsersController);
router.get('/domain/list', userController.findListUserByDomainController);
router.get('/domain/statistics', userController.statisticsDomainController);
router.delete('/domain', userController.deleteUserByDomainAndOffsetController);

export default router;
