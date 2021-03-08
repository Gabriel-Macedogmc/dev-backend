import { IUser } from './../../dtos/IUser';
import { User } from '@/modules/users/infra/typeorm/entities/User';
import { IUserRepository } from './../IUserRepository';
import { v4 } from 'uuid';

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  public async findAll(): Promise<User[]> {
    const users = this.users;
    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === user_id);

    return findUser;
  }

  public async create(data: IUser): Promise<User> {
    const user = new User();

    Object.assign(
      user,
      {
        id: v4(),
      },
      data,
    );

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;

    return user;
  }

  public async delete(user_id: string): Promise<void> {
    const user = this.users.findIndex(find => find.id === user_id);
    this.users.pop();
  }
}
