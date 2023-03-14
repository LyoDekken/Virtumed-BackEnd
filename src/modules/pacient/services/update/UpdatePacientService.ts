import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IPacientRepository from '@modules/pacient/repositories/IPacientRepository';

interface IRequest {
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
class UpdatePacientService {
    constructor(
        @inject('PacientsRepository')
        private usersRepository: IPacientRepository,
    ) {}

    public async execute({
        id,
        rg,
        cpf,
        cep,
        address,
        number,
        city,
        district,
        state,
    }: IRequest): Promise<User | null> {
        const user = await this.usersRepository.findById(id);

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

export default UpdatePacientService;
