import { ShowAddressService } from './find-unique-address-service';
import { InMemoryAddressRepository } from './../repositories/in-memory-repository/in-memory-address-repository';

let inMemoryAddressRepository: InMemoryAddressRepository;
let showService: ShowAddressService;

describe('Find Address', () => {
  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository();
    showService = new ShowAddressService(inMemoryAddressRepository);
  });

  it('Should return unique address', async () => {
    const address = await inMemoryAddressRepository.create({
      address: 'any_address',
      city: 'any_city',
      complement: 'any_complement',
      cep: 1234123,
      number: 123,
      state: 'any_state',
      user_id: '',
    });

    const findAddress = await showService.execute(address.id);

    expect(findAddress?.cep).toBe(1234123);
    expect(findAddress?.address).toBe('any_address');
  });
});
