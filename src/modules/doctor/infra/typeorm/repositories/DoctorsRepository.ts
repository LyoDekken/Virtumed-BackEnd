import { Repository } from 'typeorm';

import { PostgresDataSource } from '@shared/infra/typeorm/index';

import { uuid } from 'uuidv4';
import User from '@modules/users/infra/typeorm/entities/User';
import IDoctorRepository from '@modules/doctor/repositories/IDoctorRepository';
import ICreateDoctorDTO from '@modules/doctor/dtos/ICreateDoctorDTO';

class DoctorsRepository implements IDoctorRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = PostgresDataSource.getRepository(User);
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

    public async findAllDoctors(): Promise<User[] | null> {
        try {
            const user = await this.ormRepository
                .createQueryBuilder("user")
                .leftJoinAndSelect("user.doctor", "doctor")
                .where("user.role = :role", { role: "DOCTOR" })
                .select(["user.id", "user.name", "user.email", "user.role", "user.avatar", "user.created_at", "user.updated_at", "doctor"])
                .getMany();

            return user;
        } catch (err) {
            console.log(err);
            return null;
        }
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
            where: { email },
        });

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
            }
        });

        await this.ormRepository.save(user);
        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default DoctorsRepository;
