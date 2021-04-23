import { Address } from './../infra/typeorm/entities/Address';
import { IAddress } from './../dtos/IAddress';

export interface IAddressRepository {
  findById(address_id: string): Promise<Address | undefined>;
  find(): Promise<Address[]>;
  create(data: IAddress): Promise<Address>;
  save(data: IAddress): Promise<Address>;
  delete(addres_id: string): Promise<void>;
}
