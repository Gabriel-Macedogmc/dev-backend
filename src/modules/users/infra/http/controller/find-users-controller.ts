import { container } from 'tsyringe';
import { FindUsersService } from '@/modules/users/services/find-users-service';
import { Request, Response } from 'express';

export class FindUsersController {
  public async find(req: Request, res: Response): Promise<Response> {
    const userService = container.resolve(FindUsersService);
    const users = await userService.execute();

    return res.status(200).json(users);
  }
}
