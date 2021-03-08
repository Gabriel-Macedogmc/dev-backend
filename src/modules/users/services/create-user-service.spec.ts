import CreateUserService from '@/modules/users/services/create-user-service';
import { AppError } from '@/shared/errors/AppError';
import { InMemoryHashProvider } from './../provider/fake/in-memory-hash-provider';
import { InMemoryUserRepository } from '../repositories/in-memory-repository/in-memory-user-repository';

let inMemoryUserRepository: InMemoryUserRepository;
let createUser: CreateUserService;
let hashProvider: InMemoryHashProvider;

describe('create user', () => {
  beforeEach(() => {
    hashProvider = new InMemoryHashProvider();
    inMemoryUserRepository = new InMemoryUserRepository();
    createUser = new CreateUserService(inMemoryUserRepository, hashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      password: '123456',
      email: 'johndoe@example.com',
      age: 'any_age',
      telephone: 'any_telephone',
      weight: 'any_weight',
      ethnicity: 'branca',
    });
    expect(user).toHaveProperty('id');
  });

  it('should NOT be able to create a two with same email', async () => {
    await createUser.execute({
      name: 'John Doe',
      password: '123456',
      email: 'johndoe@example.com',
      age: 'any_age',
      telephone: 'any_telephone',
      weight: 'any_weight',
      ethnicity: 'branca',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        password: '123456',
        email: 'johndoe@example.com',
        age: 'any_age',
        telephone: 'any_telephone',
        weight: 'any_weight',
        ethnicity: 'branca',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
