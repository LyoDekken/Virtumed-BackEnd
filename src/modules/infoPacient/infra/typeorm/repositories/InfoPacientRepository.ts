import { Repository } from 'typeorm';

import { PostgresDataSource } from '@shared/infra/typeorm/index';
import User from '@modules/users/infra/typeorm/entities/User';
import IInfoPacientRepository from '@modules/infoPacient/repositories/IInfoPacientRepository';
import PatientInfo from '../entities/InfoPacient';
import ICreateInfoPacientDTO from '@modules/infoPacient/dtos/ICreateInfoPacientDTO';

class InfoPacientRepository implements IInfoPacientRepository {
    private ormRepository: Repository<User>;
    private infoPacientRepository: Repository<PatientInfo>;

    constructor() {
        this.ormRepository = PostgresDataSource.getRepository(User);
        this.infoPacientRepository = PostgresDataSource.getRepository(PatientInfo);
    }

    public async createInfoPacient(data: ICreateInfoPacientDTO): Promise<PatientInfo | null> {
        const user = await this.findById(data.id);

        const pacientId = user?.pacient.id

        const infoPacient = this.infoPacientRepository.create({
            gender: data.gender,
            age: data.age,
            height: data.height,
            weight: data.weight,
            pacient: {
                id: pacientId
            }
        })

        await this.savePacient(infoPacient);

        return infoPacient;
    }


    public async findById(id: string): Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: {
                id,
            },
            relations: ["pacient"]
        });

        return user;
    }

    public async findInfoPatient(id: string): Promise<PatientInfo[] | null> {
        const user = await this.findById(id)
        const pacientId = user?.pacient.id

        const Patientinfo = await this.infoPacientRepository.find({
            where: {
                pacient: {
                    id: pacientId
                }
            }
        });

        return Patientinfo;
    }

    public async findInfoPatientForDoctor(id: string): Promise<PatientInfo[] | null> {
        const user = await this.findById(id)
        const pacientId = user?.pacient.id

        const Patientinfo = await this.infoPacientRepository.find({
            where: {
                pacient: {
                    id: pacientId
                }
            }
        });

        return Patientinfo;
    }

    public async findByEmail(email: string): Promise<User | undefined | null> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }

    public async savePacient(user: ICreateInfoPacientDTO): Promise<PatientInfo> {
        return this.infoPacientRepository.save(user);
    }
}

export default InfoPacientRepository;
