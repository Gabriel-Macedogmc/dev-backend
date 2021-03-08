import { AppError } from '@/shared/errors/AppError';
import { IAddress } from './../dtos/IAddress';
import { IAddressRepository } from './../repositories/IAddressRepository';
import { inject, injectable } from 'tsyringe';
import { Address } from '../infra/typeorm/entities/Address';

interface IRequest {
  address_id: string;
  address: string;
  user_id: string;
  number: string;
  complement: string;
  CEP: string;
  city: string;
  state: string;
}

@injectable()
export class UpdateAddressService {
  constructor(
    @inject('AddressRepository') private addressRepository: IAddressRepository,
  ) {}

  public async execute({
    address,
    address_id,
    CEP,
    city,
    complement,
    number,
    state,
    user_id,
  }: IRequest): Promise<Address | undefined> {
    const addressExist = await this.addressRepository.findById(address_id);

    if (!addressExist) {
      throw new AppError('Address not exist!', 401);
    }

    if (CEP.length > 8) {
      throw new AppError('CEP invalid!', 401);
    }

    if (!user_id) {
      throw new AppError('User not exist', 401);
    }

    await this.addressRepository.save(addressExist);
    return addressExist;
  }
}
