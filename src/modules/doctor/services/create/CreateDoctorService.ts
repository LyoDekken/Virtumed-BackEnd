import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IDoctorRepository from '@modules/doctor/repositories/IDoctorRepository';

interface IRequest {
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
class CreateDoctorService {
    constructor(
        @inject('DoctorsRepository')
        private usersRepository: IDoctorRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
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
    }: IRequest): Promise<User> {
        const user = await this.usersRepository.findByEmail(email);

        if (user) {
            throw new AppError('E-mail already exists');
        }

        const passwordHash = await this.hashProvider.generateHash(password);

        const userExist = await this.usersRepository.createDoctor({
            name,
            email,
            password: passwordHash,
            number,
            cpf,
            cep,
            address,
            crm,
            city,
            district,
            speciality,
            state,
        });

        await this.cacheProvider.invalidatePrefix('providers-list');

        return userExist;
    }
}

export default CreateDoctorService;
