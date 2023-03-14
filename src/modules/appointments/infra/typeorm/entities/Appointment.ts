import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(() => User, { eager: true, cascade: true })
    @JoinColumn({ name: 'provider_id' })
    provider: User;

    @Column()
    user_id: string;

    @ManyToOne(() => User, { eager: true, cascade: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: "timestamp without time zone", nullable: false })
    date: Date;

    @Column({ nullable: true })
    idRoom: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Appointment;
