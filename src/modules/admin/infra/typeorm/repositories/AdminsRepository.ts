import { Repository } from 'typeorm';
import { PostgresDataSource } from '@shared/infra/typeorm/index';

import { uuid } from 'uuidv4';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateClinicDTO from '@modules/clinic/dtos/ICreateClinicDTO';
import IAdminRepository from '@modules/admin/repositories/IAdminRepository';
import ICreatePacientDTO from '@modules/pacient/infra/dtos/ICreatePacientDTO';
import ICreateDoctorDTO from '@modules/doctor/dtos/ICreateDoctorDTO';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AdminsRepository implements IAdminRepository {
    private ormRepository: Repository<User>;
    private appointmentRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = PostgresDataSource.getRepository(User);
        this.appointmentRepository = PostgresDataSource.getRepository(Appointment);
    }

    public async findAll(): Promise<User[]> {
        const users = await this.ormRepository.find();
        return users;
    }

    public async updateDoctor(id: string): Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: {
                id,
            },
            relations: ['doctor'],
        });

        return user;
    }

    public async updateClinic(id: string): Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: {
                id,
            },
            relations: ['clinic'],
        });

        return user;
    }

    public async updatePacient(id: string): Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: {
                id,
            },
            relations: ['pacient'],
        });

        return user;
    }

    public async findById(id: string): Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: {
                id,
            },
        });

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined | null> {
        const user = await this.ormRepository.findOne({
            where: {
                email,
            },
        });

        return user;
    }

    public async createClinic(userData: ICreateClinicDTO): Promise<User> {
        const user = this.ormRepository.create({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: 'CLINIC',
            clinic: {
                id: uuid(),
                razao: userData.razao,
                cnpj: userData.cnpj,
                cep: userData.cep,
                address: userData.address,
                city: userData.city,
                district: userData.district,
                number: userData.number,
                state: userData.state,
            },
        });

        await this.ormRepository.save(user);

        return user;
    }

    public async createPacient(userData: ICreatePacientDTO): Promise<User> {
        const user = this.ormRepository.create({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: 'PACIENT',
            pacient: {
                id: uuid(),
                rg: userData.rg,
                cep: userData.cep,
                cpf: userData.cpf,
                address: userData.address,
                city: userData.city,
                district: userData.district,
                number: userData.number,
                state: userData.state,
            },
        });

        await this.ormRepository.save(user);

        return user;
    }

    public async createDoctor(userData: ICreateDoctorDTO): Promise<User> {
        const user = this.ormRepository.create({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: 'DOCTOR',
            doctor: {
                id: uuid(),
                speciality: userData.speciality,
                state: userData.state,
                cep: userData.cep,
                cpf: userData.cpf,
                crm: userData.crm,
                address: userData.address,
                city: userData.city,
                district: userData.district,
                number: userData.number,
            },
        });

        await this.ormRepository.save(user);
        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }

    public async delete(id: string): Promise<void> {
        const user = await this.ormRepository.findOne({
            where: {
                id,
            },
        });

        if (!user) {
            throw new AppError('E-mail do not exists');
        }

        const appointments = await this.appointmentRepository.find({
            where: {
                user_id: id,
            },
        });

        appointments.forEach(async appointment => {
            await this.appointmentRepository.remove(appointment);
        });

        await this.ormRepository.remove(user);
    }
}

export default AdminsRepository;
