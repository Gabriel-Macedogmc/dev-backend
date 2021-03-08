import 'reflect-metadata';
import { AppError } from './../../../shared/errors/AppError';
import { IAddressRepository } from './../repositories/IAddressRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeleteAddressService {
  constructor(
    @inject('AddressRepository') private addressRepository: IAddressRepository,
  ) {}

  public async execute(address_id: string): Promise<void> {
    const address = await this.addressRepository.findById(address_id);

    if (!address) {
      throw new AppError('Address is not Found', 401);
    }
    await this.addressRepository.delete(address_id);
  }
}
