import { AppError } from './../../../shared/errors/AppError';
import { DeleteAddressService } from './delete-address-service';
import { InMemoryAddressRepository } from './../repositories/in-memory-repository/in-memory-address-repository';

let inMemoryAddressRepository: InMemoryAddressRepository;
let deleteService: DeleteAddressService;

describe('Delete Address', () => {
  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository();
    deleteService = new DeleteAddressService(inMemoryAddressRepository);
  });

  it('should be able to delete address', async () => {
    const address = await inMemoryAddressRepository.create({
      address: 'any_address',
      city: 'any_city',
      complement: 'any_complement',
      CEP: 'any_cep',
      number: 'any_number',
      state: 'any_state',
      user_id: 'any_user_id',
    });
    const deletedAddress = await deleteService.execute(address.id);
    expect(deletedAddress).toBe(undefined);
  });

  it('shoould NOT be able delete without address_id', async () => {
    await expect(
      deleteService.execute('non_existing_address_id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
