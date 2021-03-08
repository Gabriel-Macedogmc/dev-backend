import { container } from 'tsyringe';
import { Request, Response } from 'express';
import AuthUsersService from '@/modules/users/services/auth-user-service';

export class AuthUserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const userService = container.resolve(AuthUsersService);

    const user = await userService.execute({ email, password });

    return res.status(200).json(user);
  }
}
