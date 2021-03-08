import { FindAddressService } from './find-address-service';
import { InMemoryAddressRepository } from './../repositories/in-memory-repository/in-memory-address-repository';

let inMemoryAddressRepository: InMemoryAddressRepository;
let findService: FindAddressService;

describe('Find Address', () => {
  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository();
    findService = new FindAddressService(inMemoryAddressRepository);
  });

  it('should be able to return all address', async () => {
    const data = {
      address: 'any_address',
      city: 'any_city',
      complement: 'any_complement',
      CEP: 'any_cep',
      number: 'any_number',
      state: 'any_state',
      user_id: 'any_user_id',
    };

    //await inMemoryAddressRepository.create(data);
    const address2 = await inMemoryAddressRepository.create(data);

    await expect(findService.execute()).resolves.toHaveBeenCalled();
  });
});
