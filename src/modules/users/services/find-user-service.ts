import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@/modules/users/repositories/IUserRepository';

import { User } from '@/modules/users/infra/typeorm/entities/User';
import { AppError } from '@/shared/errors/AppError';

interface IRequest {
  user_id: string;
}

@injectable()
export class FindUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User | undefined> {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found.');
    }
    return user;
  }
}
