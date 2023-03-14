import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import uploadConfig from '@config/upload';

import Doctor from '@modules/doctor/infra/typeorm/entities/Doctor';
import Pacient from '@modules/pacient/infra/typeorm/entities/Pacient';

import { Expose } from 'class-transformer';

@Entity()
class S3MedicalRecord {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    diagnosis: string;

    @Column({ nullable: true })
    diagnosis_file: string;

    @Column()
    nameDoctor: string;

    @Column()
    doctorCRM: string;

    @ManyToOne(() => Doctor, doctor => doctor.medicalRecords)
    doctor?: Doctor;

    @ManyToOne(() => Pacient, pacient => pacient.medicalRecords)
    pacient?: Pacient;

    @Expose({ name: 'diagnosis_url' })
    medicalRecordUrl(): string | null {
        if (!this.diagnosis_file) {
            return null;
        }

        switch (uploadConfig.driver) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.diagnosis_file}`;
            case 's3':
                return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.diagnosis_file}`;
            default:
                return null;
        }
    }

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default S3MedicalRecord;
