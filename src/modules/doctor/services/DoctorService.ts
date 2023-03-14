import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IDoctorRepository from '@modules/doctor/repositories/IDoctorRepository';

@injectable()
class DoctorService {
    constructor(
        @inject('DoctorsRepository')
        private usersRepository: IDoctorRepository,
    ) {}

    public async execute(): Promise<User[] | null> {
        const user = await this.usersRepository.findAllDoctors();

        return user;
    }
}
export default DoctorService;
