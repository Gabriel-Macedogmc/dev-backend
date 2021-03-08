import 'reflect-metadata';
import { AppError } from '@/shared/errors/AppError';
import { IAddressRepository } from '../repositories/IAddressRepository';
import { inject, injectable } from 'tsyringe';
import { Address } from '../infra/typeorm/entities/Address';

@injectable()
export class FindCepAddressService {
  constructor(
    @inject('AddressRepository') private addressRepository: IAddressRepository,
  ) {}

  public async execute(cep: string): Promise<Address | undefined> {
    const address = await this.addressRepository.findByCep(cep);

    if (cep.length > 8) {
      throw new AppError('CEP invalid!', 401);
    }
    return address;
  }
}
