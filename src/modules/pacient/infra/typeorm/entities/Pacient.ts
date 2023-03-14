import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import FavoriteDoctor from '@modules/favoriteDoctor/infra/typeorm/entities/FavoriteDoctor';
import Clinic from '@modules/clinic/infra/typeorm/entities/Clinic';
import PatientInfo from '@modules/infoPacient/infra/typeorm/entities/InfoPacient';
import Doctor from '@modules/doctor/infra/typeorm/entities/Doctor';
import MedicalRecord from '@modules/medicalRecord/infra/typeorm/entities/MedicalRecord';
import S3MedicalRecord from '@modules/medicalRecord/infra/typeorm/entities/MedicalRecordS3';

@Entity()
class Pacient {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    rg: string;

    @Column()
    cpf: string;

    @Column()
    cep: string;

    @Column()
    address: string;

    @Column()
    number: string;

    @Column()
    state: string;

    @Column()
    district: string;

    @Column()
    city: string;

    @OneToOne(() => Pacient, pacient => pacient.user)
    user: User;

    @ManyToMany(() => Clinic, clinic => clinic.pacients)
    @JoinTable()
    clinics?: Clinic[];

    @ManyToMany(() => Doctor, doctor => doctor.pacients)
    @JoinTable()
    doctors?: Doctor[];

    @OneToMany(() => PatientInfo, patientInfo => patientInfo.pacient)
    info: PatientInfo;

    @OneToMany(() => MedicalRecord, medicalRecord => medicalRecord.pacient)
    medicalRecords: MedicalRecord;

    @OneToMany(
        () => S3MedicalRecord,
        s3medicalRecord => s3medicalRecord.pacient,
    )
    medicalRecordsS3: S3MedicalRecord;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Pacient;
