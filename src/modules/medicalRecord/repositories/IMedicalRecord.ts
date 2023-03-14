import User from '@modules/users/infra/typeorm/entities/User';
import MedicalRecord from '@modules/medicalRecord/infra/typeorm/entities/MedicalRecord';
import S3MedicalRecord from '@modules/medicalRecord/infra/typeorm/entities/MedicalRecordS3';

import ICreateMedicalRecordDTO from '../dtos/ICreateMedicalRecord';
import IMedicalRecordS3DTO from '../dtos/IMedicalRecordS3DTO';

export default interface IMedicalRecordRepository {
    S3CreateFileMedicalRecord(data: IMedicalRecordS3DTO): Promise<S3MedicalRecord | null>;
    createMedicalRecord(data: ICreateMedicalRecordDTO): Promise<MedicalRecord | null>;
    findByIdMedicalRecordForDoctor(id: string): Promise<MedicalRecord[] | null>;
    findByIdMedicalRecordForPatient(id: string): Promise<MedicalRecord[] | null>;
    findById(id: string): Promise<User | undefined | null>;
    findById(id: string): Promise<User | undefined | null>;
    findByEmail(email: string): Promise<User | undefined | null>;
    savePacient(medicalRecord: MedicalRecord): Promise<MedicalRecord>
    save(user: User): Promise<User>;
}
