import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import 'reflect-metadata';
import { IAddressRepository } from './../repositories/IAddressRepository';
import { inject, injectable } from 'tsyringe';
import { Address } from '../infra/typeorm/entities/Address';
import { AppError } from '@/shared/errors/AppError';

interface IRequest {
  address: string;
  user_id: string;
  number: string;
  complement: string;
  CEP: string;
  city: string;
  state: string;
}

@injectable()
export class CreateAddressService {
  constructor(
    @inject('AddressRepository') private addressRepository: IAddressRepository,
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async execute({
    address,
    CEP,
    city,
    complement,
    number,
    state,
    user_id,
  }: IRequest): Promise<Address> {
    const user = await this.userRepository.findById(user_id);
    if (!CEP || CEP.length >= 8) {
      throw new AppError('CEP invalid!', 401);
    }

    if (!user?.id) {
      throw new AppError('User not exist', 401);
    }

    const addressCreate = await this.addressRepository.create({
      address,
      CEP,
      city,
      complement,
      number,
      state,
      user_id,
    });

    return addressCreate;
  }
}
