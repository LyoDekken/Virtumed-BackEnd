import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IClinicRepository from '@modules/clinic/repositories/IClinicsRepository';

interface IRequest {
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

@injectable()
class UpdateClinicService {
    constructor(
        @inject('ClinicsRepository')
        private usersRepository: IClinicRepository,
    ) {}

    public async execute({
        id,
        razao,
        cnpj,
        cep,
        address,
        number,
        city,
        district,
        state,
    }: IRequest): Promise<User | null> {
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
}

export default UpdateClinicService;
