import FindUsersService from '@/modules/users/services/find-users-service';
import { InMemoryUserRepository } from './../repositories/in-memory-repository/in-memory-user-repository';

let inMemoryUserRepository: InMemoryUserRepository;
let findUsersService: FindUsersService;

enum EthnicityType {
  branca = 'branca',
  parda = 'parda',
  amarela = 'amarela',
  preta = 'preta',
  indígena = 'indígena',
}

// describe('FindUsers', () => {
//   beforeEach(() => {
//     inMemoryUserRepository = new InMemoryUserRepository();
//     findUsersService = new FindUsersService(inMemoryUserRepository);
//   });

//   it('should be able to return all users', async () => {
//     const data = {
//       name: 'John Doe',
//       password: '123456',
//       email: 'johndoe@example.com',
//       age: 'any_age',
//       telephone: 'any_telephone',
//       weight: 'any_weight',
//       ethnicity: EthnicityType.branca,
//     };

//     const user1 = await inMemoryUserRepository.create(data);
//     const user2 = await inMemoryUserRepository.create(data);
//     const user3 = await inMemoryUserRepository.create(data);

//     const users = await findUsersService.execute();

//     expect(users).toEqual([user1, user2, user3]);
//   });
// });
