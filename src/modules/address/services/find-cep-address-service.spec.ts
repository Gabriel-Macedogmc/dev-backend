import { FindCepAddressService } from './find-cep-addres-service';
import { InMemoryAddressRepository } from './../repositories/in-memory-repository/in-memory-address-repository';
import { AppError } from '@/shared/errors/AppError';

let inMemoryAddressRepository: InMemoryAddressRepository;
let findService: FindCepAddressService;

describe('Find Address', () => {
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
    const cep = findService.execute(address.CEP);

    expect(cep).toHaveProperty('CEP');
  });

  it('should NOT accept more than 8 chars in CEP', async () => {
    await expect(
      inMemoryAddressRepository.create({
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
      inMemoryAddressRepository.create({
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
