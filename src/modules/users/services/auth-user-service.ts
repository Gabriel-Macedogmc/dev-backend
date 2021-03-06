import 'reflect-metadata';
import { IHashProvider } from './../provider/models/IHash';
import authConfig from '@/config/authConfig';
import { sign } from 'jsonwebtoken';
import { AppError } from '@/shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@/modules/users/repositories/IUserRepository';

import { User } from '@/modules/users/infra/typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: User;
}

@injectable()
export class AuthUsersService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hash: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email/Password does not match.', 401);
    }

    let tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!tester.test(email)) {
      throw new AppError('Email invalid', 401);
    }

    const passwordMatched = await this.hash.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('email/pasword error');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return {
      user,
      token,
    };
  }
}
