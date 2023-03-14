import { Request, Response } from "express";
import { container } from "tsyringe";

import SendForgotPasswordEmailService from "@modules/users/services/security/SendForgotPasswordEmailService";
import { instanceToInstance } from "class-transformer";

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    const data = await sendForgotPasswordEmail.execute({
      email,
    });

    return response.json(instanceToInstance(data));
  }
}
