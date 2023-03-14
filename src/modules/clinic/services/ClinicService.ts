import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IClinicRepository from '../repositories/IClinicsRepository';

@injectable()
class ClinicsService {
    constructor(
        @inject('ClinicsRepository')
        private usersRepository: IClinicRepository,
    ) {}

    public async execute(): Promise<User[] | null> {
        const user = await this.usersRepository.findAllClinics();

        return user;
    }

    public async findAllofClinic(userId: string): Promise<User[] | null> {
        const user = await this.usersRepository.findDoctorsAndPacients(userId);

        return user;
    }
}
export default ClinicsService;
