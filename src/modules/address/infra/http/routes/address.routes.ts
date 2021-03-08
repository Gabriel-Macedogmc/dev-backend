import { Router } from 'express';
import {
  CreateAddressController,
  FindAddressController,
  FindCepAddressController,
  UpdateAddressController,
  DeleteAddressController,
} from '../controller/index';

import { AuthMiddleware } from '@/shared/middleware/AuthMiddleware';

const createAddressController = new CreateAddressController();
const findAddressController = new FindAddressController();
const findCepAddressController = new FindCepAddressController();
const updateAddressController = new UpdateAddressController();
const deleteAddressController = new DeleteAddressController();

const addressRouter = Router();

addressRouter.post('/', AuthMiddleware, createAddressController.create);
addressRouter.get('/', AuthMiddleware, findAddressController.find);
addressRouter.get('/cep', AuthMiddleware, findCepAddressController.index);
addressRouter.put(
  '/:address_id',
  AuthMiddleware,
  updateAddressController.create,
);
addressRouter.delete(
  '/:address_id',
  AuthMiddleware,
  deleteAddressController.delete,
);

export { addressRouter };
