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
    );
  });

  it('should be able to create a new address', async () => {
    const address = await createAddress.execute({
      address: 'any_address',
      city: 'any_city',
      complement: 'any_complement',
      CEP: 'any_cep',
      number: 'any_number',
      state: 'any_state',
      user_id: 'any_user_id',
    });

    expect(address).toHaveProperty('id');
  });

  it('should NOT accept more than 8 chars in CEP', async () => {
    await expect(
      createAddress.execute({
        address: 'any_address',
        city: 'any_city',
        complement: 'any_complement',
        CEP: 'any_cep'.repeat(100),
        number: 'any_number',
        state: 'any_state',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create address without user_id', async () => {
    await expect(
      createAddress.execute({
        address: 'any_address',
        city: 'any_city',
        complement: 'any_complement',
        CEP: 'any_cep',
        number: 'any_number',
        state: 'any_state',
        user_id: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
