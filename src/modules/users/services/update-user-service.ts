import { UserValidationGroup } from '@/shared/validators/user-validator/user-validation-group';
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
  telephone: number;
  password?: string;
  old_password?: string;
  email: string;
  age: number;
  weight: number;
  ethnicity?: EthnicityType;
}

@injectable()
export class UpdateUsersService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hash: IHashProvider,
    private userValidation: UserValidationGroup,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    telephone,
    age,
    weight,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const checkEmail = await this.userRepository.findByEmail(email);

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

      const validate = this.userValidation.validate({
        email,
        age,
        telephone,
        weight,
      });

      if (!validate) {
        throw new AppError('You need to inform the current Params.');
      }

      user.password = await this.hash.encrypt(password);
    }

    user.name = name;
    user.email = email;
    user.age = age;
    user.weight = weight;
    user.telephone = telephone;

    return this.userRepository.save(user);
  }
}
