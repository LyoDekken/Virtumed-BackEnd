import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IAdiminRepository from '@modules/admin/repositories/IAdminRepository';

interface IRequestClinic {
    id: string;
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
    id: string;
    cpf: string;
    crm: string;
    cep: string;
    address: string;
    number: string;
    city: string;
    district: string;
    state: string;
    speciality: string;
}

interface IRequestPacient {
    id: string;
    rg: string;
    cpf: string;
    cep: string;
    address: string;
    number: string;
    city: string;
    district: string;
    state: string;
}

@injectable()
class UpdateAdminsService {
    constructor(
        @inject('AdminsRepository')
        private usersRepository: IAdiminRepository,
    ) {}

    public async updateClinic({
        id,
        razao,
        cnpj,
        cep,
        address,
        number,
        city,
        district,
        state,
    }: IRequestClinic): Promise<User | null> {
        const user = await this.usersRepository.updateClinic(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        user.clinic.cep = cep;
        user.clinic.razao = razao;
        user.clinic.cnpj = cnpj;
        user.clinic.address = address;
        user.clinic.number = number;
        user.clinic.state = state;
        user.clinic.district = district;
        user.clinic.city = city;

        await this.usersRepository.save(user);

        return user;
    }

    public async updateDoctor({
        id,
        cep,
        cpf,
        crm,
        address,
        number,
        city,
        district,
        state,
        speciality
    }: IRequestDoctor): Promise<User | null> {
        const user = await this.usersRepository.updateDoctor(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        user.doctor.address = address,
        user.doctor.city = city,
        user.doctor.district = district,
        user.doctor.number = number,
        user.doctor.speciality = speciality,
        user.doctor.state = state,
        user.doctor.cep = cep;
        user.doctor.cpf = cpf;
        user.doctor.crm = crm;

        await this.usersRepository.save(user);

        return user;
    }

    public async updatePacient({
        id,
        rg,
        cpf,
        cep,
        address,
        number,
        city,
        district,
        state,
    }: IRequestPacient): Promise<User | null> {
        const user = await this.usersRepository.updatePacient(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        user.pacient.cep = cep;
        user.pacient.rg = rg;
        user.pacient.cpf = cpf;
        user.pacient.address = address;
        user.pacient.number = number;
        user.pacient.city = city;
        user.pacient.district = district;
        user.pacient.state = state;

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateAdminsService;
