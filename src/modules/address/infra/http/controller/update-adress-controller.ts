import { UpdateAddressService } from './../../../services/update-address-service';
import { container } from 'tsyringe';

import { Request, Response } from 'express';

export class UpdateAddressController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { address_id } = req.params;
    const { address, number, complement, cep, city, state, user_id } = req.body;

    const addressService = container.resolve(UpdateAddressService);
    const Address = await addressService.execute({
      address_id,
      user_id,
      address,
      number,
      complement,
      CEP: cep,
      city,
      state,
    });

    return res.status(201).json(Address);
  }
}
