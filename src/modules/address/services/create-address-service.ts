import { AddressValidationGroup } from './../../../shared/validators/address-validator/address-validation-group';
import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import 'reflect-metadata';
import { IAddressRepository } from './../repositories/IAddressRepository';
import { inject, injectable } from 'tsyringe';
import { Address } from '../infra/typeorm/entities/Address';
import { AppError } from '@/shared/errors/AppError';

interface IRequest {
  address: string;
  user_id: string;
  number: number;
  complement: string;
  cep: number;
  city: string;
  state: string;
}

@injectable()
export class CreateAddressService {
  constructor(
    @inject('AddressRepository') private addressRepository: IAddressRepository,
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('AddressValidation')
    private addressValidation: AddressValidationGroup,
  ) {}

  public async execute({
    address,
    cep,
    city,
    complement,
    number,
    state,
    user_id,
  }: IRequest): Promise<Address> {
    const user = await this.userRepository.findById(user_id);

    if (!user?.id) {
      throw new AppError('User not exist', 401);
    }

    const validate = this.addressValidation.validate(cep);

    if (!validate) {
      throw new AppError('Cep is Invalid', 401);
    }

    const addressCreate = await this.addressRepository.create({
      address,
      cep,
      city,
      complement,
      number,
      state,
      user_id,
    });

    return addressCreate;
  }
}
