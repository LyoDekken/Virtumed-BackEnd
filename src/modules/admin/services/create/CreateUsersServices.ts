import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '../../../users/providers/HashProvider/models/IHashProvider';
import IAdiminRepository from '@modules/admin/repositories/IAdminRepository';

interface IRequestClinic {
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

interface IRequestDoctor {
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

interface IRequestPacient {
    name: string;
    rg: string;
    cpf: string;
    cep: string;
    address: string;
    number: string;
    city: string;
    district: string;
    state: string;
    email: string;
    password: string;
}

@injectable()
class CreateUsersService {
    constructor(
        @inject('AdminsRepository')
        private usersRepository: IAdiminRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async CreateDoctor({
        name,
        cpf,
        cep,
        address,
        number,
        city,
        district,
        state,
        email,
        crm,
        speciality,
        password,
    }: IRequestDoctor): Promise<User> {
        const user = await this.usersRepository.findByEmail(email);

        if (user) {
            throw new AppError('E-mail already exists');
        }

        const passwordHash = await this.hashProvider.generateHash(password);

        const userExist = await this.usersRepository.createDoctor({
            name,
            cpf,
            cep,
            address,
            number,
            city,
            district,
            state,
            email,
            crm,
            speciality,
            password: passwordHash,
        });

        await this.cacheProvider.invalidatePrefix('providers-list');

        return userExist;
    }

    public async CreatePacient({
        name,
        rg,
        cpf,
        cep,
        address,
        number,
        city,
        district,
        state,
        email,
        password,
    }: IRequestPacient): Promise<User> {
        const user = await this.usersRepository.findByEmail(email);

        if (user) {
            throw new AppError('E-mail already exists');
        }

        const passwordHash = await this.hashProvider.generateHash(password);

        const userExist = await this.usersRepository.createPacient({
            name,
            rg,
            cpf,
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

    public async CreateClinic({
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
    }: IRequestClinic): Promise<User> {
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

export default CreateUsersService;
