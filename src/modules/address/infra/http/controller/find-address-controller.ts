import { FindAddressService } from './../../../services/find-address-service';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

export class FindAddressController {
  public async find(req: Request, res: Response): Promise<Response> {
    const addressService = container.resolve(FindAddressService);
    const Address = await addressService.execute();

    return res.status(201).json(Address);
  }
}
