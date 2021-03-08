import { User } from '../infra/typeorm/entities/User';
import { IUser } from '../dtos/IUser';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  create(ddta: IUser): Promise<User>;
  save(data: IUser): Promise<User>;
  delete(user_id: string): Promise<void>;
}
