import { IAddress } from './../../dtos/IAddress';
import { Address } from './../../infra/typeorm/entities/Address';
import { IAddressRepository } from './../IAddressRepository';

import { v4 } from 'uuid';

export class InMemoryAddressRepository implements IAddressRepository {
  private address: Address[] = [];

  public async find(): Promise<Address[]> {
    const address = this.address;
    return address;
  }

  public async findByCep(cep: string): Promise<Address | undefined> {
    const findCep = this.address.find(address => address.CEP === cep);
    return findCep;
  }

  public async findById(address_id: string): Promise<Address | undefined> {
    const findAddress = this.address.find(address => address.id === address.id);

    return findAddress;
  }

  public async create(data: IAddress): Promise<Address> {
    const address = new Address();

    Object.assign(
      address,
      {
        id: v4(),
      },
      data,
    );

    return address;
  }

  public async save(address: Address): Promise<Address> {
    const findIndex = this.address.findIndex(
      findAddress => findAddress.id === address.id,
    );
    this.address[findIndex] = address;

    return address;
  }

  public async delete(address_id: string): Promise<void> {
    const address = this.address.findIndex(find => find.id === address_id);
    this.address.pop();
  }
}
