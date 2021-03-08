import { AppError } from '@/shared/errors/AppError';
import FindUserService from '@/modules/users/services/find-user-service';
import { InMemoryUserRepository } from './../repositories/in-memory-repository/in-memory-user-repository';

let inMemoryUserRepository: InMemoryUserRepository;
let findUserService: FindUserService;

describe('Find Unique User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    findUserService = new FindUserService(inMemoryUserRepository);
  });
  it('should be able return unique user', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      password: '123456',
      email: 'johndoe@example.com',
      age: 'any_age',
      telephone: 'any_telephone',
      weight: 'weight',
      ethnicity: 'branca',
    });

    const findUser = await findUserService.execute({ user_id: user.id });

    expect(findUser?.name).toBe('John Doe');
    expect(findUser?.email).toBe('johndoe@example.com');
  });

  it('should NOT be able to show the user of a non-existing-id user', async () => {
    await expect(
      findUserService.execute({ user_id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
