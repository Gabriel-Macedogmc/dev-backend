import 'reflect-metadata';
import { IHashProvider } from './../provider/models/IHash';
import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import { AppError } from '@/shared/errors/AppError';
import {
  EthnicityType,
  User,
} from '@/modules/users/infra/typeorm/entities/User';
import { UserValidationGroup } from '@/shared/validators/user-validator/user-validation-group';

interface IRequest {
  name: string;
  telephone: number;
  password: string;
  email: string;
  age: number;
  weight: number;
  ethnicity: EthnicityType;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hash: IHashProvider,
    @inject('UserValidation') private userValidation: UserValidationGroup,
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

    const validate = this.userValidation.validate({
      email,
      telephone,
      age,
      weight,
    });

    if (!validate) {
      throw new AppError('Param Invalid!!', 401);
    }

    const passwordHashed = await this.hash.encrypt(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHashed,
      telephone,
      age,
      weight,
      ethnicity,
    });

    return user;
  }
}
