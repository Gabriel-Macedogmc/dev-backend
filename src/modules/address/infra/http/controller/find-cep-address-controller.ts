import { FindCepAddressService } from '../../../services/find-cep-address-service';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

export class FindCepAddressController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { cep } = req.body;
    const addressService = container.resolve(FindCepAddressService);
    const Address = await addressService.execute(cep);

    return res.status(201).json(Address);
  }
}
