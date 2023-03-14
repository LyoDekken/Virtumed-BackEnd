import { Repository } from 'typeorm';

import { PostgresDataSource } from '@shared/infra/typeorm/index';

import { uuid } from 'uuidv4';
import User from '@modules/users/infra/typeorm/entities/User';
import IPacientRepository from '@modules/pacient/repositories/IPacientRepository';
import ICreatePacientDTO from '../../dtos/ICreatePacientDTO';

class PacientsRepository implements IPacientRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = PostgresDataSource.getRepository(User);
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

    public async findAllPacients(): Promise<User[] | null> {
        const user = await this.ormRepository.find({
            where: {
                role: 'PACIENT',
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
            where: { email },
        });

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
                state: userData.state
            }
        });

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default PacientsRepository;
