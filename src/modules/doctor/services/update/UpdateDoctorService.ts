import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IDoctorRepository from '@modules/doctor/repositories/IDoctorRepository';

interface IRequest {
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

@injectable()
class UpdateDoctorService {
    constructor(
        @inject('DoctorsRepository')
        private usersRepository: IDoctorRepository,
    ) {}

    public async execute({
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
    }: IRequest): Promise<User | null> {
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
}

export default UpdateDoctorService;
