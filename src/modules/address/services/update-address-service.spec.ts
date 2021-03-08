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
  it('should be able to update the address', async () => {
    const address = await inMemoryAddressRepository.create({
      address: 'any_address',
      city: 'any_city',
      complement: 'any_complement',
      CEP: 'any_cep',
      number: 'any_number',
      state: 'any_state',
      user_id: 'any_user_id',
    });

    const updatedAddress = await updateService.execute({
      address_id: address.id,
      address: 'any_address',
      city: 'any_city',
      complement: 'any_complement',
      CEP: 'any_cep',
      number: 'any_number',
      state: 'any_state',
      user_id: 'any_user_id',
    });

    expect(updatedAddress?.address).toBe('any_address');
    expect(updatedAddress?.CEP).toBe('any_cep');
  });
});
