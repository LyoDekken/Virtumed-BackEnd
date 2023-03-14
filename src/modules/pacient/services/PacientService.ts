import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IPacientRepository from '../repositories/IPacientRepository';

@injectable()
class PacientService {
    constructor(
        @inject('PacientsRepository')
        private usersRepository: IPacientRepository,
    ) /* @inject("HashProvider")
    private hashProvider: IHashProvider,

    @inject("CacheProvider")
    private cacheProvider: ICacheProvider, */
    {}

    public async execute(): Promise<User[] | null> {
        const user = await this.usersRepository.findAllPacients();

        return user;
    }
}
export default PacientService;
