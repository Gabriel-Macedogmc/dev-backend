import { AppError } from '@/shared/errors/AppError';
import 'reflect-metadata';
import { IAddressRepository } from './../repositories/IAddressRepository';
import { inject, injectable } from 'tsyringe';
import { Address } from '../infra/typeorm/entities/Address';

@injectable()
export class ShowAddressService {
  constructor(
    @inject('AddressRepository') private addressRepository: IAddressRepository,
  ) {}

  public async execute(address_id: string): Promise<Address | undefined> {
    const address = await this.addressRepository.findById(address_id);

    if (!address) {
      throw new AppError('Address not exist', 401);
    }

    return address;
  }
}
