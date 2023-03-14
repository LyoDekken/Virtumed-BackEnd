import { Repository } from 'typeorm';
import { PostgresDataSource } from '@shared/infra/typeorm/index';

import User from '@modules/users/infra/typeorm/entities/User';
import MedicalRecord from '@modules/medicalRecord/infra/typeorm/entities/MedicalRecord';
import S3MedicalRecord from '@modules/medicalRecord/infra/typeorm/entities/MedicalRecordS3';

import IMedicalRecordRepository from '@modules/medicalRecord/repositories/IMedicalRecord';
import ICreateMedicalRecordDTO from '@modules/medicalRecord/dtos/ICreateMedicalRecord';
import IMedicalRecordS3DTO from '@modules/medicalRecord/dtos/IMedicalRecordS3DTO';

class MedicalRecordRepository implements IMedicalRecordRepository {
    private ormRepository: Repository<User>;
    private medicalRecordRepository: Repository<MedicalRecord>;
    private medicalFileRecordRepository: Repository<S3MedicalRecord>;

    constructor() {
        this.ormRepository = PostgresDataSource.getRepository(User);
        this.medicalRecordRepository = PostgresDataSource.getRepository(MedicalRecord);
        this.medicalFileRecordRepository = PostgresDataSource.getRepository(S3MedicalRecord);
    }

    public async S3CreateFileMedicalRecord(data: IMedicalRecordS3DTO): Promise<S3MedicalRecord | null> {
        const userDoctor = await this.findDoctorById(data.id);
        const userPacient = await this.findById(data.pacient_id);

        const medicalRecordFile = this.medicalFileRecordRepository.create({
            diagnosis_file: data.diagnosis_file,
            nameDoctor: userDoctor?.name,
            doctorCRM: userDoctor?.doctor.crm,
            diagnosis: data.diagnosis,
            doctor: {
                id: userDoctor?.doctor.id
            },
            pacient: {
                id: userPacient?.pacient.id
            }
        })

        await this.saveFilePacient(medicalRecordFile);

        return medicalRecordFile
    }

    public async createMedicalRecord(data: ICreateMedicalRecordDTO): Promise<MedicalRecord | null> {
        const userDoctor = await this.findDoctorById(data.id);
        const userPacient = await this.findById(data.pacientId);

        let doctorCrm = userDoctor?.doctor.crm
        let doctorName = userDoctor?.name

        const medicalRecord = this.medicalRecordRepository.create({
            diagnosis: data.diagnosis,
            doctorCRM: doctorCrm,
            nameDoctor: doctorName,
            date: data.date,
            observations: data.observations,
            doctor: {
                id: userDoctor?.doctor.id
            },
            pacient: {
                id: userPacient?.pacient.id
            }
        })

        await this.savePacient(medicalRecord);

        return medicalRecord;
    }

    public async findByIdMedicalRecordForDoctor(id: string): Promise<MedicalRecord[] | null> {
        const user = await this.findDoctorById(id);

        const infoUser = user?.doctor.id

        const medicalRecord = await this.medicalRecordRepository.find({
            where: {
                doctor: {
                    id: infoUser
                }
            }
        })

        return medicalRecord;
    }

    public async findByIdMedicalRecordForPatient(id: string): Promise<MedicalRecord[] | null> {
        const user = await this.findById(id);

        const infoUser = user?.pacient.id

        const medicalRecord = await this.medicalRecordRepository.find({
            where: {
                pacient: {
                    id: infoUser
                }
            }
        })


        return medicalRecord;
    }

    public async findById(id: string): Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: {
                id,
            },
            relations: ["pacient"]
        });

        return user;
    }

    public async findDoctorById(id: string): Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: {
                id,
            },
            relations: ["doctor"]
        });

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined | null> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }

    public async savePacient(medicalRecord: MedicalRecord): Promise<MedicalRecord> {
        return this.medicalRecordRepository.save(medicalRecord);
    }

    public async saveFilePacient(medicalFileRecord: S3MedicalRecord): Promise<S3MedicalRecord> {
        return this.medicalFileRecordRepository.save(medicalFileRecord);
    }
}

export default MedicalRecordRepository;
