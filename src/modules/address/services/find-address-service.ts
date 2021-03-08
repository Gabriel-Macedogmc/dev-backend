import 'reflect-metadata';
import { IAddressRepository } from './../repositories/IAddressRepository';
import { inject, injectable } from 'tsyringe';
import { Address } from '../infra/typeorm/entities/Address';

@injectable()
export class FindAddressService {
  constructor(
    @inject('AddressRepository') private addressRepository: IAddressRepository,
  ) {}

  public async execute(): Promise<Address[]> {
    const address = await this.addressRepository.find();
    return address;
  }
}
