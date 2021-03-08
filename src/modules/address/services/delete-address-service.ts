import { IAddressRepository } from './../repositories/IAddressRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeleteAddressService {
  constructor(
    @inject('AddressRepository') private addressRepository: IAddressRepository,
  ) {}

  public async execute(address_id: string): Promise<void> {
    await this.addressRepository.delete(address_id);
  }
}
