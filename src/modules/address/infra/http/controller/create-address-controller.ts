import { container } from 'tsyringe';

import { Request, Response } from 'express';
import { CreateAddressService } from '@/modules/address/services/create-address-service';

export class CreateAddressController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { address, number, complement, cep, city, state, user_id } = req.body;

    const addressService = container.resolve(CreateAddressService);
    const Address = await addressService.execute({
      user_id,
      address,
      number,
      complement,
      cep: cep,
      city,
      state,
    });

    return res.status(201).json(Address);
  }
}
