import { Repository } from 'typeorm';
import { PostgresDataSource } from '@shared/infra/typeorm/index';

import { uuid } from 'uuidv4';
import User from '@modules/users/infra/typeorm/entities/User';
import IClinicRepository from '@modules/clinic/repositories/IClinicsRepository';
import ICreateClinicDTO from '@modules/clinic/dtos/ICreateClinicDTO';
import ICreateDoctorDTO from '@modules/doctor/dtos/ICreateDoctorDTO';
import Doctor from '@modules/doctor/infra/typeorm/entities/Doctor';
import Clinic from '../entities/Clinic';
import ICreatePacientDTO from '@modules/pacient/infra/dtos/ICreatePacientDTO';

class ClinicsRepository implements IClinicRepository {
    private ormRepository: Repository<User>;
    private doctorRepository: Repository<Doctor>;
    private clinicRepository: Repository<Clinic>;

    constructor() {
        this.ormRepository = PostgresDataSource.getRepository(User);
        this.doctorRepository = PostgresDataSource.getRepository(Doctor);
        this.clinicRepository = PostgresDataSource.getRepository(Clinic);
    }

    public async findDoctorsAndPacients(userId: string): Promise<User[] | null> {
        const users = await this.ormRepository
        .createQueryBuilder("users")
        .leftJoinAndSelect("users.clinic", "clinic")
        .leftJoinAndSelect("clinic.doctors", "doctors")
        .leftJoinAndSelect("clinic.pacients", "pacients")
        .where("users.id = :userId", { userId })
        .getMany();

        return users;

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

    public async findAllClinics(): Promise<User[] | null> {
        const user = await this.ormRepository.find({
            where: {
                role: 'CLINIC',
            },
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

    public async createDoctorforClinic(
        userData: ICreateDoctorDTO,
    ): Promise<User | null> {
        const clinics = await this.updateClinic(userData.id);

        const user = this.ormRepository.create({
            name: userData.name,
            email: userData.email,
            role: 'DOCTOR',
            password: userData.password,
            doctor: {
                crm: userData.crm,
                cpf: userData.cpf,
                cep: userData.cep,
                address: userData.address,
                number: userData.number,
                district: userData.district,
                city: userData.city,
                state: userData.state,
                speciality: userData.speciality,
                clinics: [
                    {
                        id: clinics?.clinic.id,
                    },
                ],
            },
        });

        await this.ormRepository.save(user);

        return user;
    }

    public async createPacientforClinic(
        userData: ICreatePacientDTO,
    ): Promise<User> {

        const clinics = await this.updateClinic(userData.id);

        const user = this.ormRepository.create({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: 'DOCTOR',
            doctor: {
                id: uuid(),
                state: userData.state,
                cep: userData.cep,
                cpf: userData.cpf,
                address: userData.address,
                city: userData.city,
                district: userData.district,
                number: userData.number,
                clinics: [
                    {
                        id: clinics?.clinic.id,
                    },
                ],
            },
        });

        await this.ormRepository.save(user);

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

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default ClinicsRepository;
