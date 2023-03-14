import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import User from "@modules/users/infra/typeorm/entities/User";
import Doctor from '@modules/doctor/infra/typeorm/entities/Doctor';
import Pacient from '@modules/pacient/infra/typeorm/entities/Pacient';

@Entity()
class Clinic {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  razao: string;

  @Column()
  cnpj: string;

  @Column()
  cep: string;

  @Column()
  address: string;

  @Column()
  number: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @ManyToMany(() => Doctor, doctor => doctor.clinics)
  @JoinTable()
  doctors?: Doctor[];

  @ManyToMany(() => Pacient, pacient => pacient.clinics)
  @JoinTable()
  pacients?: Pacient[];

  @OneToOne(() => Clinic, clinic => clinic.user)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Clinic
