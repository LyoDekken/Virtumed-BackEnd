import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';

import Pacient from '@modules/pacient/infra/typeorm/entities/Pacient';

@Entity()
class PatientInfo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    age: string;

    @Column()
    gender: string;

    @Column()
    weight: string;

    @Column()
    height: string;

    @ManyToOne(() => Pacient, pacient => pacient.info)
    pacient?: Pacient;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default PatientInfo;
