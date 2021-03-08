import { DeleteAddressService } from './../../../services/delete-address-service';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

export class DeleteAddressController {
  public async delete(req: Request, res: Response): Promise<Response> {
    const { address_id } = req.params;
    const addressService = container.resolve(DeleteAddressService);
    const Address = await addressService.execute(address_id);

    return res.status(201).json(Address);
  }
}
