import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToInstance } from "class-transformer";

import AuthenticateUserSerivce from "@modules/users/services/auth/AuthenticateUserService";

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserSerivce);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({ user: instanceToInstance(user), token });
  }
}
