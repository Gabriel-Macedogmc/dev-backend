import AppError from '@/shared/errors/AppError';
import UpdateUsersService from '@/modules/users/services/update-user-service';
import { InMemoryUserRepository } from './../repositories/in-memory-repository/in-memory-user-repository';
import { InMemoryHashProvider } from './../provider/fake/in-memory-hash-provider';

let inMemoryUserRepository: InMemoryUserRepository;
let updateUsersService: UpdateUsersService;
let hashProvider: InMemoryHashProvider;

// describe('Authenticate User', () => {
//   beforeEach(() => {
//     inMemoryUserRepository = new InMemoryUserRepository();
//     hashProvider = new InMemoryHashProvider();
//     updateUsersService = new UpdateUsersService(
//       inMemoryUserRepository,
//       hashProvider,
//     );
//   });
//   it('should be able to update user', async () => {
//     const user = await inMemoryUserRepository.create({
//       name: 'John Doe',
//       password: '123456',
//       email: 'johndoe@example.com',
//       age: 'any_age',
//       telephone: 'any_telephone',
//       weight: 'any_weight',
//       ethnicity: 'branca',
//     });

//     const updatedUser = await updateUsersService.execute({
//       user_id: user.id,
//       name: 'John Treh',
//       email: 'johntreh@example.com',
//       age: 'any_age',
//       telephone: 'any_telephone',
//       weight: 'any_weight',
//       ethnicity: 'branca',
//     });

//     expect(updatedUser.name).toBe('John Treh');
//     expect(updatedUser.email).toBe('johntreh@example.com');
//     expect(updatedUser.age).toBe('any_age');
//     expect(updatedUser.telephone).toBe('any_telephone');
//     expect(updatedUser.weight).toBe('any_weight');
//     expect(updatedUser.ethnicity).toBe('branca');
//   });

//   it('should NOT be able to update email to an already using email', async () => {
//     const user = await inMemoryUserRepository.create({
//       name: 'John Treh',
//       password: '123456',
//       email: 'johntreh@example.com',
//       age: 'any_age',
//       telephone: 'any_telephone',
//       weight: 'any_weight',
//       ethnicity: 'branca',
//     });

//     await inMemoryUserRepository.create({
//       name: 'John Doe',
//       password: '123456',
//       email: 'johndoe@example.com',
//       age: 'any_age',
//       telephone: 'any_telephone',
//       weight: 'any_weight',
//       ethnicity: 'branca',
//     });

//     await expect(
//       updateUsersService.execute({
//         user_id: user.id,
//         name: 'John Doe',
//         email: 'johndoe@example.com',
//         age: 'any_age',
//         telephone: 'any_telephone',
//         weight: 'any_weight',
//         ethnicity: 'branca',
//       }),
//     ).rejects.toBeInstanceOf(AppError);
//   });

//   it('should be able to update the password', async () => {
//     const user = await inMemoryUserRepository.create({
//       name: 'John Doe',
//       password: '123456',
//       email: 'johndoe@example.com',
//       age: 'any_age',
//       telephone: 'any_telephone',
//       weight: 'any_weight',
//       ethnicity: 'branca',
//     });

//     const updatedUser = await updateUsersService.execute({
//       user_id: user.id,
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//       password: '123123',
//       old_password: '123456',
//       age: 'any_age',
//       telephone: 'any_telephone',
//       weight: 'any_weight',
//       ethnicity: 'branca',
//     });

//     expect(updatedUser.password).toBe('123123');
//   });

//   it('');

//   it('should NOT be able to upadate user non-existing', async () => {
//     await expect(
//       updateUsersService.execute({
//         user_id: 'non-existing-id',
//         name: 'John Doe',
//         email: 'johndoe@example.com',
//         age: 'any_age',
//         telephone: 'any_telephone',
//         weight: 'any_weight',
//         ethnicity: 'branca',
//       }),
//     ).rejects.toBeInstanceOf(AppError);
//   });
// });
