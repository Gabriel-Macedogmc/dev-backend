import { container } from 'tsyringe';

import '@/modules/users/provider/index';

import { AddressRepository } from './../../modules/address/infra/typeorm/repositories/AddressRepository';
import { IAddressRepository } from './../../modules/address/repositories/IAddressRepository';

import { IUserRepository } from './../../modules/users/repositories/IUserRepository';
import { UserRepository } from '@/modules/users/infra/typeorm/repositories/UserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IAddressRepository>(
  'AddressRepository',
  AddressRepository,
);
