import { IUserRepository } from './../../../repositories/IUserRepository';
import { IUser } from './../../../dtos/IUser';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAll(): Promise<User[]> {
    const users = this.ormRepository.find();

    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id: user_id },
    });

    return user;
  }

  public async create(data: IUser): Promise<User> {
    const user = this.ormRepository.create(data);
    await this.ormRepository.save(user);

    return user;
  }

  public async save(data: IUser): Promise<User> {
    const user = await this.ormRepository.save(data);
    return user;
  }

  public async delete(user_id: string): Promise<void> {
    const user = await this.ormRepository.findOneOrFail(user_id);
    await this.ormRepository.remove(user);
  }
}
