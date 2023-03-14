import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IClinicsRepository from '@modules/clinic/repositories/IClinicsRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
    razao: string;
    cnpj: string;
    cep: string;
    address: string;
    number: string;
    city: string;
    district: string;
    state: string;
}

@injectable()
class CreateClinicService {
    constructor(
        @inject('ClinicsRepository')
        private usersRepository: IClinicsRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        name,
        razao,
        cnpj,
        cep,
        address,
        number,
        city,
        district,
        state,
        email,
        password,
    }: IRequest): Promise<User> {
        const user = await this.usersRepository.findByEmail(email);

        if (user) {
            throw new AppError('E-mail already exists');
        }

        const passwordHash = await this.hashProvider.generateHash(password);

        const userExist = await this.usersRepository.createClinic({
            name,
            razao,
            cnpj,
            cep,
            address,
            number,
            city,
            district,
            state,
            email,
            password: passwordHash,
        });

        await this.cacheProvider.invalidatePrefix('providers-list');

        return userExist;
    }
}

export default CreateClinicService;
