import FavoriteDoctor from '@modules/favoriteDoctor/infra/typeorm/entities/FavoriteDoctor';
import IFavoriteDoctorsRepository from '@modules/favoriteDoctor/repositories/IFavoriteDoctorRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    patient_id: string;
}

@injectable()
class FavoriteDoctorService {
    constructor(
        @inject('FavoriteDoctorsRepository')
        private favoritesRepository: IFavoriteDoctorsRepository,
    ) {}

    public async execute({ patient_id }: IRequest): Promise<FavoriteDoctor[]> {
        const doctor = await this.favoritesRepository.findFavorites(patient_id);
        return doctor;
    }
}

export default FavoriteDoctorService;
