import 'reflect-metadata';
import { IHashProvider } from './../provider/models/IHash';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@/modules/users/repositories/IUserRepository';

import {
  EthnicityType,
  User,
} from '@/modules/users/infra/typeorm/entities/User';

import { AppError } from '@/shared/errors/AppError';

interface IRequest {
  user_id: string;
  name: string;
  telephone: string;
  password?: string;
  old_password?: string;
  email: string;
  age: string;
  weight: string;
  ethnicity: EthnicityType;
}

@injectable()
export class UpdateUsersService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hash: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const checkEmail = await this.userRepository.findByEmail(email);

    let tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!tester.test(email)) {
      throw new AppError('Email invalid', 401);
    }

    if (checkEmail && checkEmail.id !== user_id) {
      throw new AppError('This email is already used by another user.');
    }

    if (password && !old_password) {
      throw new AppError('You need to inform the current password.');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hash.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Wrong current password.');
      }

      user.password = await this.hash.encrypt(password);
    }

    return this.userRepository.save(user);
  }
}
