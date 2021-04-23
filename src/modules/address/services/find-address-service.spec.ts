import { FindAddressService } from './find-address-service';
import { InMemoryAddressRepository } from './../repositories/in-memory-repository/in-memory-address-repository';

let inMemoryAddressRepository: InMemoryAddressRepository;
let findService: FindAddressService;

describe('Find Address', () => {
  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository();
    findService = new FindAddressService(inMemoryAddressRepository);
  });

  it('should be able to return a server error if Find Address throws', async () => {
    jest.spyOn(inMemoryAddressRepository, 'find').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(findService.execute()).rejects.toBeInstanceOf(Error);
  });

  it('should be able to return all address', async () => {
    const data = {
      address: 'any_address',
      city: 'any_city',
      complement: 'any_complement',
      cep: 1234123,
      number: 123,
      state: 'any_state',
      user_id: 'any_user_id',
    };

    const address = await inMemoryAddressRepository.create(data);
    const address2 = await inMemoryAddressRepository.create(data);
    const address3 = await inMemoryAddressRepository.create(data);

    await expect(findService.execute()).resolves.toEqual([
      address,
      address2,
      address3,
    ]);
  });
});
