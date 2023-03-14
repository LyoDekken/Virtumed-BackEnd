import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IMedicalRecordRepository from '../repositories/IMedicalRecord';
import S3MedicalRecord from '../infra/typeorm/entities/MedicalRecordS3';

interface IRequest {
    id: string;
    diagnosis: string;
    pacient_id: string;
    diagnosis_file: string;
}

@injectable()
class S3MedicalRecordService {
    constructor(
        @inject('MedicalRecordRepository')
        private medicalRecordRepository: IMedicalRecordRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({
        id,
        pacient_id,
        diagnosis,
        diagnosis_file,
    }: IRequest): Promise<S3MedicalRecord | null> {
        const doctor = await this.medicalRecordRepository.findById(id);

        if (!doctor) {
            throw new AppError(
                'Only authenticated users can create Medical Record',
                401,
            );
        }

        const filename = await this.storageProvider.saveFile(diagnosis_file);

        const medicalFilename =
            await this.medicalRecordRepository.S3CreateFileMedicalRecord({
                id,
                pacient_id,
                diagnosis,
                diagnosis_file: filename,
            });

        return medicalFilename;
    }
}

export default S3MedicalRecordService;
