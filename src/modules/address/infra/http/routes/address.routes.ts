import { Router } from 'express';
import {
  CreateAddressController,
  FindAddressController,
  ShowAddressController,
  UpdateAddressController,
  DeleteAddressController,
} from '../controller/index';

import { AuthMiddleware } from '@/shared/middleware/AuthMiddleware';

const createAddressController = new CreateAddressController();
const findAddressController = new FindAddressController();
const showAddressController = new ShowAddressController();
const updateAddressController = new UpdateAddressController();
const deleteAddressController = new DeleteAddressController();

const addressRouter = Router();

addressRouter.post('/', AuthMiddleware, createAddressController.create);
addressRouter.get('/', AuthMiddleware, findAddressController.find);
addressRouter.get('/:address_id', AuthMiddleware, showAddressController.show);
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
