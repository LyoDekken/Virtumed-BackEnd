import FavoriteDoctor from '@modules/favoriteDoctor/infra/typeorm/entities/FavoriteDoctor';
import IFavoriteDoctorsRepository from '@modules/favoriteDoctor/repositories/IFavoriteDoctorRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    patient_id: string;
    doctor_id: string;
}

@injectable()
class CreateFavoriteDoctorService {
    constructor(
        @inject('FavoriteDoctorsRepository')
        private favoritesRepository: IFavoriteDoctorsRepository,
    ) {}

    public async execute({
        patient_id,
        doctor_id,
    }: IRequest): Promise<FavoriteDoctor> {
        const doctorExist = await this.favoritesRepository.addFavoriteDoctor({
            doctor_id,
            patient_id
        });

        return doctorExist;
    }
}

export default CreateFavoriteDoctorService;
