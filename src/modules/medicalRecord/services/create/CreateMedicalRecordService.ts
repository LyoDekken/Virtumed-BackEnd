import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMedicalRecordRepository from '@modules/medicalRecord/repositories/IMedicalRecord';
import MedicalRecord from '@modules/medicalRecord/infra/typeorm/entities/MedicalRecord';

interface IRequest {
    id: string;
    pacientId: string;
    diagnosis: string;
    observations: string;
    date: Date;
}

@injectable()
class CreateMedicalRecordService {
    constructor(
        @inject('MedicalRecordRepository')
        private usersRepository: IMedicalRecordRepository,
    ) {}

    public async execute({
        id,
        pacientId,
        diagnosis,
        observations,
        date,
    }: IRequest): Promise<MedicalRecord | null> {
        const user = await this.usersRepository.findById(id);
        const pacientID = await this.usersRepository.findById(pacientId);

        if (!user && !pacientID) {
            throw new AppError('E-mail do not exists');
        }

        const medicalRecord = await this.usersRepository.createMedicalRecord({
            id,
            pacientId,
            diagnosis,
            observations,
            date,
        });

        return medicalRecord;
    }
}

export default CreateMedicalRecordService;
