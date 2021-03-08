import { InMemoryHashProvider } from './../provider/fake/in-memory-hash-provider';
import { AppError } from '@/shared/errors/AppError';
import AuthUsersService from '@/modules/users/services/auth-user-service';
import { InMemoryUserRepository } from './../repositories/in-memory-repository/in-memory-user-repository';

let inMemoryUserRepository: InMemoryUserRepository;
let authUsersService: AuthUsersService;
let hashProvider: InMemoryHashProvider;

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    hashProvider = new InMemoryHashProvider();
    authUsersService = new AuthUsersService(
      inMemoryUserRepository,
      hashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      password: '123456',
      email: 'johndoe@example.com',
      age: 'any_age',
      telephone: 'any_telephone',
      weight: 'any_weight',
      ethnicity: 'branca',
    });

    const response = await authUsersService.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should NOT be able to authenticate with non existing user', async () => {
    await expect(
      authUsersService.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to authenticate with wrong password', async () => {
    await inMemoryUserRepository.create({
      name: 'John Doe',
      password: '123456',
      email: 'johndoe@example.com',
      age: 'any_age',
      telephone: 'any_telephone',
      weight: 'any_weight',
      ethnicity: 'branca',
    });

    await expect(
      authUsersService.execute({
        email: 'johndoe@example.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
