import { Router } from 'express';
import {
  CreateUserController,
  FindUsersController,
  FindUserController,
  UpdateUserController,
  DeleteUserController,
} from './../controller/index';
import { AuthMiddleware } from '@/shared/middleware/AuthMiddleware';

const createUserController = new CreateUserController();
const findUsersController = new FindUsersController();
const findUserController = new FindUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const userRouter = Router();

userRouter.post('/', createUserController.create);
userRouter.get('/', AuthMiddleware, findUsersController.find);
userRouter.get('/profile/:user_id', AuthMiddleware, findUserController.find);
userRouter.put(
  '/profile/:user_id',
  AuthMiddleware,
  updateUserController.create,
);
userRouter.delete(
  '/profile/:user_id',
  AuthMiddleware,
  deleteUserController.delete,
);

export { userRouter };
