import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import Doctor from '@modules/doctor/infra/typeorm/entities/Doctor';
import Pacient from '@modules/pacient/infra/typeorm/entities/Pacient';

@Entity()
class MedicalRecord {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    diagnosis: string;

    @Column()
    observations: string;

    @Column()
    nameDoctor: string;

    @Column()
    doctorCRM: string;

    @Column()
    date: Date;

    @ManyToOne(() => Doctor, doctor => doctor.medicalRecords)
    doctor?: Doctor;

    @ManyToOne(() => Pacient, pacient => pacient.medicalRecords)
    pacient?: Pacient;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default MedicalRecord;
