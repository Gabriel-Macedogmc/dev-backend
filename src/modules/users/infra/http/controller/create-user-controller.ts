import { container } from 'tsyringe';
import { CreateUserService } from '@/modules/users/services/create-user-service';
import { Request, Response } from 'express';
export class CreateUserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      age,
      telephone,
      weight,
      ethnicity,
    } = req.body;

    const userService = container.resolve(CreateUserService);
    const user = await userService.execute({
      name,
      email,
      password,
      age,
      telephone,
      weight,
      ethnicity,
    });

    return res.status(201).json(user);
  }
}
