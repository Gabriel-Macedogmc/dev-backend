import { FindCepAddressService } from './find-cep-address-service';
import { InMemoryAddressRepository } from './../repositories/in-memory-repository/in-memory-address-repository';
import { AppError } from '@/shared/errors/AppError';

let inMemoryAddressRepository: InMemoryAddressRepository;
let findService: FindCepAddressService;

describe('Find CEP', () => {
  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository();
    findService = new FindCepAddressService(inMemoryAddressRepository);
  });

  it('should be able to return CEP', async () => {
    const address = await inMemoryAddressRepository.create({
      address: 'any_address',
      city: 'any_city',
      complement: 'any_complement',
      CEP: 'any_cep',
      number: 'any_number',
      state: 'any_state',
      user_id: 'any_user_id',
    });

    expect(address.CEP).toBe('any_cep');
  });

  it('should NOT accept more than 8 chars in CEP', async () => {
    const address = await inMemoryAddressRepository.create({
      address: 'any_address',
      city: 'any_city',
      complement: 'any_complement',
      CEP: 'any_cep',
      number: 'any_number',
      state: 'any_state',
      user_id: 'user_id',
    });

    await expect(
      findService.execute(address.CEP.repeat(10)),
    ).rejects.toBeInstanceOf(AppError);
  });
});
