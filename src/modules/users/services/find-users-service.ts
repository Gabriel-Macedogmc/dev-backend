import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@/modules/users/repositories/IUserRepository';

import { User } from '@/modules/users/infra/typeorm/entities/User';

@injectable()
export default class FindUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}
