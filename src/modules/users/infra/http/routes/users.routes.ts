import { Router } from 'express';

import {
  CreateUserController,
  FindUsersController,
  FindUserController,
  UpdateUserController,
  DeleteUserController,
} from './../controller/index';

import { celebrate, Segments, Joi } from 'celebrate';

import { AuthMiddleware } from '@/shared/middleware/AuthMiddleware';

const createUserController = new CreateUserController();
const findUsersController = new FindUsersController();
const findUserController = new FindUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const userRouter = Router();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  createUserController.create,
);
userRouter.get('/', AuthMiddleware, findUsersController.find);
userRouter.get('/:id', AuthMiddleware, findUserController.find);
userRouter.put('/:user_id', AuthMiddleware, updateUserController.create);
userRouter.delete('/:user_id', AuthMiddleware, deleteUserController.delete);

export { userRouter };
