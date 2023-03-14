import Doctor from '@modules/doctor/infra/typeorm/entities/Doctor';
import Pacient from '@modules/pacient/infra/typeorm/entities/Pacient';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity()
class FavoriteDoctor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    doctor_id: string;

    @Column()
    patient_id: string;

    @ManyToOne(() => Doctor, { cascade: true })
    @JoinColumn({name: 'doctor_id'})
    doctor: Doctor;

    @ManyToOne(() => Pacient, { cascade: true })
    @JoinColumn({name: 'patient_id'})
    patient: Pacient;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default FavoriteDoctor;
