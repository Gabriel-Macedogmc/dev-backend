import { container } from 'tsyringe';
import FindUserService from '@/modules/users/services/find-user-service';
import { Request, Response } from 'express';

export class FindUserController {
  public async find(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userService = container.resolve(FindUserService);

    const user = await userService.execute(id);

    return res.status(200).json(user);
  }
}
