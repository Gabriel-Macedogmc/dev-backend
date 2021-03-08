import { AppError } from '@/shared/errors/AppError';
import { IAddressRepository } from './../repositories/IAddressRepository';
import { inject, injectable } from 'tsyringe';
import { Address } from '../infra/typeorm/entities/Address';

@injectable()
export class FindCepAddressService {
  constructor(
    @inject('AddressRepository') private addressRepository: IAddressRepository,
  ) {}

  public async execute(cep: string): Promise<Address> {
    const address = await this.addressRepository.findByCep(cep);
    if (!address) {
      throw new AppError('CEP not exist!', 401);
    }

    if (cep.length > 8) {
      throw new AppError('CEP invalid!', 401);
    }
    return address;
  }
}
