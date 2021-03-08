import { addressRouter } from '@/modules/address/infra/http/routes';
import {
  userRouter,
  sessionRoute,
} from '@/modules/users/infra/http/routes/index';

import { Router } from 'express';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/address', addressRouter);
routes.use('/session', sessionRoute);

export default routes;
