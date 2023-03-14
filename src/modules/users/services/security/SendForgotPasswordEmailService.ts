import { injectable, inject } from "tsyringe";
import path from "path";

import AppError from "@shared/errors/AppError";

import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import IUsersRepository from "../../repositories/IUsersRepository";
import IUserTokensRepository from "../../repositories/IUserTokensRepository";

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("MailProvider")
    private mailProvider: IMailProvider,

    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<string> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists.");
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    const message = await this.mailProvider.sendMail(
      email,
      `Pedido de Recuperação de senha ${token}`
    );

    return message
  }
}

export default SendForgotPasswordEmailService;
