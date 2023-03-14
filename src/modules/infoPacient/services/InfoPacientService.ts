import { injectable, inject } from 'tsyringe';

import InfoPacientRepository from '../infra/typeorm/repositories/InfoPacientRepository';
import PatientInfo from '../infra/typeorm/entities/InfoPacient';
import AppError from '@shared/errors/AppError';

@injectable()
class InfoPacientService {
    constructor(
        @inject('InfoPacientRepository')
        private usersRepository: InfoPacientRepository,
    ) {}

    public async execute(id: string): Promise<PatientInfo[] | null> {
        const infoUser = await this.usersRepository.findById(id);

        if (!infoUser) {
            throw new AppError('User do not exists');
        }

        const user = await this.usersRepository.findInfoPatient(id);

        return user;
    }

    public async executeForDoctor(id: string): Promise<PatientInfo[] | null> {
        const infoUser = await this.usersRepository.findById(id);

        if (!infoUser) {
            throw new AppError('User do not exists');
        }

        const user = await this.usersRepository.findInfoPatientForDoctor(id);

        return user;
    }
}
export default InfoPacientService;
