import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@/modules/users/repositories/IUserRepository';

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async execute(user_id: string): Promise<void> {
    await this.userRepository.delete(user_id);
  }
}
