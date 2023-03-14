import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IInfoPacientRepository from '@modules/infoPacient/repositories/IInfoPacientRepository';
import PatientInfo from '@modules/infoPacient/infra/typeorm/entities/InfoPacient';

interface IRequest {
    id: string;
    age: string;
    gender: string;
    height: string;
    weight: string;
}

@injectable()
class CreateInfoPacientService {
    constructor(
        @inject('InfoPacientRepository')
        private usersRepository: IInfoPacientRepository,
    ) {}

    public async execute({
        id,
        age,
        gender,
        height,
        weight,
    }: IRequest): Promise<PatientInfo | null> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('E-mail do not exists');
        }

        const infoPacient = await this.usersRepository.createInfoPacient({
            id,
            age,
            gender,
            height,
            weight,
        });

        return infoPacient
    }
}

export default CreateInfoPacientService;
