import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IClinicsRepository from '@modules/clinic/repositories/IClinicsRepository';

interface IRequest {
    id: string;
    name: string;
    cpf: string;
    crm: string;
    cep: string;
    address: string;
    number: string;
    city: string;
    district: string;
    state: string;
    email: string;
    password: string;
    speciality: string;
}

@injectable()
class CreateDoctorForClinicService {
    constructor(
        @inject('ClinicsRepository')
        private usersRepository: IClinicsRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        id,
        name,
        email,
        password,
        address,
        cep,
        city,
        cpf,
        crm,
        district,
        number,
        speciality,
        state,
    }: IRequest): Promise<User | null> {
        const user = await this.usersRepository.findByEmail(email);

        if (user) {
            throw new AppError('E-mail already exists');
        }

        const passwordHash = await this.hashProvider.generateHash(password);

        const userExist = await this.usersRepository.createDoctorforClinic({
            id,
            name,
            email,
            address,
            cep,
            city,
            cpf,
            crm,
            district,
            number,
            speciality,
            state,
            password: passwordHash,
        });

        await this.cacheProvider.invalidatePrefix('providers-list');

        return userExist;
    }
}

export default CreateDoctorForClinicService;
