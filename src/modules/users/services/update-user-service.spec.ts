import { AppError } from '@/shared/errors/AppError';
import { UpdateUsersService } from '@/modules/users/services/update-user-service';
import { InMemoryUserRepository } from './../repositories/in-memory-repository/in-memory-user-repository';
import { InMemoryHashProvider } from './../provider/fake/in-memory-hash-provider';
import { userValidationGroup } from '@/shared/validators/user-validator/user-validation-group';

let inMemoryUserRepository: InMemoryUserRepository;
let updateUsersService: UpdateUsersService;
let hashProvider: InMemoryHashProvider;

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    hashProvider = new InMemoryHashProvider();
    updateUsersService = new UpdateUsersService(
      inMemoryUserRepository,
      hashProvider,
      userValidationGroup,
    );
  });
  it('should be able to update user', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      password: '123456',
      email: 'johndoe@example.com',
      age: 12,
      telephone: 123456,
      weight: 10.5,
      ethnicity: 'branca',
    });

    const updatedUser = await updateUsersService.execute({
      user_id: user.id,
      name: 'John Treh',
      email: 'johntreh@example.com',
      password: '123123',
      old_password: '123456',
      age: 12,
      telephone: 92929372,
      weight: 10.5,
      ethnicity: 'branca',
    });

    expect(updatedUser).toHaveProperty('id');
  });

  it('should NOT be able to update email to an already using email', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Treh',
      password: '123456',
      email: 'johntreh@example.com',
      age: 12,
      telephone: 92929372,
      weight: 10.5,
      ethnicity: 'branca',
    });

    await inMemoryUserRepository.create({
      name: 'John Doe',
      password: '123456',
      email: 'johndoe@example.com',
      age: 12,
      telephone: 92929372,
      weight: 10.5,
      ethnicity: 'branca',
    });

    await expect(
      updateUsersService.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        age: 12,
        telephone: 92929372,
        weight: 10.5,
        ethnicity: 'branca',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      password: '123456',
      email: 'johndoe@example.com',
      age: 12,
      telephone: 92929372,
      weight: 10.5,
      ethnicity: 'branca',
    });

    const updatedUser = await updateUsersService.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
      old_password: '123456',
      age: 12,
      telephone: 92929372,
      weight: 10.5,
      ethnicity: 'branca',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should NOT be able to update the password with wrong current password', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      password: '123456',
      email: 'johndoe@example.com',
      age: 12,
      telephone: 92929372,
      weight: 10.5,
      ethnicity: 'branca',
    });

    await expect(
      updateUsersService.execute({
        user_id: user.id,
        name: 'John Treh',
        password: '123123',
        old_password: 'wrong_old_password',
        email: 'johntreh@example.com',
        age: 12,
        telephone: 92929372,
        weight: 10.5,
        ethnicity: 'branca',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to upadate user non-existing', async () => {
    await expect(
      updateUsersService.execute({
        user_id: 'non-existing-id',
        name: 'John Doe',
        email: 'johndoe@example.com',
        age: 12,
        telephone: 92929372,
        weight: 10.5,
        ethnicity: 'branca',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
