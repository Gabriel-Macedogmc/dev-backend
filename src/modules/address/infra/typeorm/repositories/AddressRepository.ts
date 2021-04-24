import { IAddress } from './../../../dtos/IAddress';
import { Address } from './../entities/Address';
import { getRepository, Repository } from 'typeorm';
import { IAddressRepository } from './../../../repositories/IAddressRepository';

export class AddressRepository implements IAddressRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create(data: IAddress): Promise<Address> {
    const address = this.ormRepository.create(data);
    await this.ormRepository.save(address);
    return address;
  }

  public async save(data: IAddress): Promise<Address> {
    const address = await this.ormRepository.save(data);
    return address;
  }

  public async find(): Promise<Address[]> {
    const address = await this.ormRepository.find({
      relations: ['user'],
    });
    return address;
  }

  public async findById(address_id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      relations: ['user'],
      where: { id: address_id },
    });
    return address;
  }

  public async delete(address_id: string): Promise<void> {
    const address = await this.ormRepository.findOneOrFail(address_id);
    await this.ormRepository.remove(address);
  }
}
