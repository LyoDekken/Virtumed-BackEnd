import { Repository } from "typeorm";

import IUserTokensRepository from "@modules/users/repositories/IUserTokensRepository";

import UserToken from "../entities/UserToken";
import { PostgresDataSource } from "@shared/infra/typeorm/";


class UsersTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = PostgresDataSource.getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined | null> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UsersTokensRepository;
