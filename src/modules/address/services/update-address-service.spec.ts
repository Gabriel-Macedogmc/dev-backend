import { addressValidationGroup } from './../../../shared/validators/address-validator/address-validation-group';
import { UpdateAddressService } from './update-address-service';
import { InMemoryUserRepository } from './../../users/repositories/in-memory-repository/in-memory-user-repository';
import { AppError } from '@/shared/errors/AppError';

import { InMemoryAddressRepository } from './../repositories/in-memory-repository/in-memory-address-repository';

let inMemoryAddressRepository: InMemoryAddressRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let updateService: UpdateAddressService;

describe('Updated Address', () => {
  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    updateService = new UpdateAddressService(
      inMemoryAddressRepository,
      inMemoryUserRepository,
      addressValidationGroup,
    );
  });

  it('should NOT be able to update address without user_id', async () => {
    const address = await inMemoryAddressRepository.create({
      address: 'any_address',
      city: 'any_city',
      complement: 'any_complement',
      cep: 1234123,
      number: 123,
      state: 'any_state',
      user_id: 'any_user',
    });

    await expect(
      updateService.execute({
        address_id: address.id,
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

  it('should NOT be able update address non-existing', async () => {
    await expect(
      updateService.execute({
        address_id: 'address_non_existing',
        address: 'any_address',
        city: 'any_city',
        complement: 'any_complement',
        cep: 1234123,
        number: 123,
        state: 'any_state',
        user_id: 'any_user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
