import { AuthUserController } from './../controller/auth-user-controller';
import { Router } from 'express';

const authUserController = new AuthUserController();
const sessionRoute = Router();

sessionRoute.post('/', authUserController.create);

export { sessionRoute };
