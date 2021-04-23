import { AddressValidationGroup } from './../../../shared/validators/address-validator/address-validation-group';
import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import 'reflect-metadata';
import { AppError } from '@/shared/errors/AppError';
import { IAddressRepository } from './../repositories/IAddressRepository';
import { inject, injectable } from 'tsyringe';
import { Address } from '../infra/typeorm/entities/Address';

interface IRequest {
  address_id: string;
  address: string;
  user_id: string;
  number: number;
  complement: string;
  cep: number;
  city: string;
  state: string;
}

@injectable()
export class UpdateAddressService {
  constructor(
    @inject('AddressRepository') private addressRepository: IAddressRepository,
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('AddressValidation')
    private addressValidation: AddressValidationGroup,
  ) {}

  public async execute({
    address,
    address_id,
    cep,
    city,
    complement,
    number,
    state,
    user_id,
  }: IRequest): Promise<Address> {
    const addressExist = await this.addressRepository.findById(address_id);
    const user = await this.userRepository.findById(user_id);

    if (!addressExist) {
      throw new AppError('Address not exist!', 401);
    }
    if (!user || '') {
      throw new AppError('User not exist', 401);
    }

    const validate = this.addressValidation.validate(cep);

    if (!validate) {
      throw new AppError('Cep is Invalid', 401);
    }

    addressExist.cep = cep;
    addressExist.address = address;
    addressExist.city = city;
    addressExist.state = state;
    addressExist.complement = complement;
    addressExist.number = number;
    addressExist.user_id = user_id;

    return await this.addressRepository.save(addressExist);
  }
}
