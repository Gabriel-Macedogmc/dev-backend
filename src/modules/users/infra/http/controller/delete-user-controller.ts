import { container } from 'tsyringe';
import DeleteUserService from '@/modules/users/services/delete-user-service';
import { Request, Response } from 'express';

export class DeleteUserController {
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userService = container.resolve(DeleteUserService);

    const user = await userService.execute(id);

    return res.status(200).json(user);
  }
}
