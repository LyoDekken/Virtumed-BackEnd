import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMedicalRecordRepository from '../repositories/IMedicalRecord';
import MedicalRecord from '../infra/typeorm/entities/MedicalRecord';

@injectable()
class MedicalRecordForPatient {
    constructor(
        @inject('MedicalRecordRepository')
        private usersRepository: IMedicalRecordRepository,
    ) {}

    public async executeForPatient(id: string): Promise<MedicalRecord[] | null> {
        const infoUser = await this.usersRepository.findById(id);

        if (!infoUser) {
            throw new AppError('User do not exists');
        }

        const infoMedical = await this.usersRepository.findByIdMedicalRecordForPatient(id);

        return infoMedical;
    }

    public async executeForDoctor(id: string): Promise<MedicalRecord[] | null> {
        const infoUser = await this.usersRepository.findById(id);

        if (!infoUser) {
            throw new AppError('User do not exists');
        }

        const infoMedical = await this.usersRepository.findByIdMedicalRecordForDoctor(id);

        return infoMedical;
    }
}
export default MedicalRecordForPatient;
