import { AppError } from './../../../shared/errors/AppError';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@/modules/users/repositories/IUserRepository';

@injectable()
export class DeleteUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async execute(user_id: string): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 401);
    }

    console.log(user);

    await this.userRepository.delete(user_id);
  }
}
