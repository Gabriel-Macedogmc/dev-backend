import { container } from 'tsyringe';

import '@/modules/users/provider/index';

import { IValidate } from './../validators/IValidate';
import { userValidationGroup } from './../validators/user-validator/user-validation-group';
import { addressValidationGroup } from './../validators/address-validator/address-validation-group';

import { AddressRepository } from './../../modules/address/infra/typeorm/repositories/AddressRepository';
import { IAddressRepository } from './../../modules/address/repositories/IAddressRepository';

import { IUserRepository } from './../../modules/users/repositories/IUserRepository';
import { UserRepository } from '@/modules/users/infra/typeorm/repositories/UserRepository';

container.registerInstance<IValidate>('UserValidation', userValidationGroup);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerInstance<IValidate>(
  'AddressValidation',
  addressValidationGroup,
);
container.registerSingleton<IAddressRepository>(
  'AddressRepository',
  AddressRepository,
);
