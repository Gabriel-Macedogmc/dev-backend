import 'reflect-metadata';
import { IHashProvider } from './../provider/models/IHash';
import { injectable, inject } from 'tsyringe';
import { IUser } from './../dtos/IUser';
import { IUserRepository } from '@/modules/users/repositories/IUserRepository';

import { AppError } from '@/shared/errors/AppError';
import {
  EthnicityType,
  User,
} from '@/modules/users/infra/typeorm/entities/User';

interface IRequest {
  name: string;
  telephone: string;
  password: string;
  email: string;
  age: string;
  weight: string;
  ethnicity: EthnicityType;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hash: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    age,
    telephone,
    weight,
    ethnicity,
  }: IRequest): Promise<User> {
    const exist = await this.userRepository.findByEmail(email);

    if (exist) {
      throw new AppError('email already exist!!', 401);
    }

    let tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!tester.test(email)) {
      throw new AppError('Email invalid', 401);
    }

    const passwordHashed = await this.hash.encrypt(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHashed,
      age,
      telephone,
      weight,
      ethnicity,
    });

    return user;
  }
}
