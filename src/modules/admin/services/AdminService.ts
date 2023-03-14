import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IDoctorRepository from '../repositories/IAdminRepository';

@injectable()
class AdiminService {
    constructor(
        @inject('AdminsRepository')
        private usersRepository: IDoctorRepository,
    ) {}

    public async execute(): Promise<User[] | null> {
        const user = await this.usersRepository.findAll();

        return user;
    }
}
export default AdiminService;
