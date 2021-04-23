import { addressValidationGroup } from './../../../shared/validators/address-validator/address-validation-group';
import { InMemoryUserRepository } from './../../users/repositories/in-memory-repository/in-memory-user-repository';
import { AppError } from '@/shared/errors/AppError';
import { CreateAddressService } from '@/modules/address/services/create-address-service';
import { InMemoryAddressRepository } from './../repositories/in-memory-repository/in-memory-address-repository';

let inMemoryAddressRepository: InMemoryAddressRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let createAddress: CreateAddressService;

describe('Create Address', () => {
  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    createAddress = new CreateAddressService(
      inMemoryAddressRepository,
      inMemoryUserRepository,
      addressValidationGroup,
    );
  });

  it('should be able to create a new address', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'John Doe',
      password: '123456',
      email: 'johndoe@example.com',
      age: 3,
      telephone: 123456,
      weight: 10.5,
      ethnicity: 'branca',
    });
    const address = await createAddress.execute({
      address: 'any_address',
      city: 'any_city',
      complement: 'any_complement',
      cep: 1234123,
      number: 123,
      state: 'any_state',
      user_id: user.id,
    });

    expect(address).toHaveProperty('id');
  });

  it('should NOT be able to create address without user_id', async () => {
    await expect(
      createAddress.execute({
        address: 'any_address',
        city: 'any_city',
        complement: 'any_complement',
        cep: 1234123,
        number: 123,
        state: 'any_state',
        user_id: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
