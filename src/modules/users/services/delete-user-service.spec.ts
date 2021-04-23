import { AppError } from './../../../shared/errors/AppError';
import { DeleteUserService } from '@/modules/users/services/delete-user-service';
import { InMemoryUserRepository } from './../repositories/in-memory-repository/in-memory-user-repository';

let inMemoryUserRepository: InMemoryUserRepository;
let deleteUserService: DeleteUserService;

describe('Delete User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    deleteUserService = new DeleteUserService(inMemoryUserRepository);
  });

  it('should be able delete the user', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      password: '123456',
      email: 'johndoe@example.com',
      age: 12,
      telephone: 123456,
      weight: 10.5,
      ethnicity: 'branca',
    });
    const deletedUser = await deleteUserService.execute(user.id);

    expect(deletedUser).toBe(undefined);
  });

  it('should NOT be able delete without user_id', async () => {
    await expect(
      deleteUserService.execute('non_existing_user_id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
