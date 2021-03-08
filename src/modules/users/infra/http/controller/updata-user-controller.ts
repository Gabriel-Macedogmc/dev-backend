import { container } from 'tsyringe';
import UpdateUsersService from '@/modules/users/services/update-user-service';
import { Request, Response } from 'express';

export class UpdateUserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;
    const {
      name,
      email,
      password,
      old_password,
      age,
      telephone,
      weight,
      ethnicity,
    } = req.body;

    const userService = container.resolve(UpdateUsersService);
    const user = await userService.execute({
      user_id,
      name,
      email,
      password,
      old_password,
      age,
      telephone,
      weight,
      ethnicity,
    });

    return res.status(201).json(user);
  }
}
