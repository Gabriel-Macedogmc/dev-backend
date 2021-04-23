import { ShowAddressService } from './../../../services/find-unique-address-service';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

export class ShowAddressController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { address_id } = req.params;
    const addressService = container.resolve(ShowAddressService);
    const Address = await addressService.execute(address_id);

    return res.status(201).json(Address);
  }
}
