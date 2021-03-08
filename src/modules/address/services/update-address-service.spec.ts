import { UpdateAddressService } from './update-address-service';
import { AppError } from '@/shared/errors/AppError';

import { InMemoryAddressRepository } from './../repositories/in-memory-repository/in-memory-address-repository';

let inMemoryAddressRepository: InMemoryAddressRepository;
let updateService: UpdateAddressService;

describe('Updated Address', () => {
  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository();
    updateService = new UpdateAddressService(inMemoryAddressRepository);
  });

  it('should NOT be able to update address without user_id', async () => {
    const address = await inMemoryAddressRepository.create({
      address: 'any_address',
      city: 'any_city',
      complement: 'any_complement',
      CEP: 'any_cep',
      number: 'any_number',
      state: 'any_state',
      user_id: 'any_user',
    });

    await expect(
      updateService.execute({
        address_id: address.id,
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

  it('should NOT be able update address non-existing', async () => {
    await expect(
      updateService.execute({
        address_id: 'address_non_existing',
        address: 'any_address',
        city: 'any_city',
        complement: 'any_complement',
        CEP: 'any_cep',
        number: 'any_number',
        state: 'any_state',
        user_id: 'any_user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
