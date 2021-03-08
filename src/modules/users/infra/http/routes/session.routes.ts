import { AuthUserController } from './../controller/auth-user-controller';
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

const authUserController = new AuthUserController();
const sessionRoute = Router();

sessionRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  authUserController.create,
);

export { sessionRoute };
