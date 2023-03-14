import FavoriteDoctorService from '@modules/favoriteDoctor/service/FavoriteDoctorService';
import CreateFavoriteDoctorsService from '@modules/favoriteDoctor/service/create/CreateFavoriteDoctor';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class favoriteDoctorssController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const patient_id  = request.user.id;
        const { doctor_id } = request.body;

        const createUser = container.resolve(CreateFavoriteDoctorsService);

        const user = await createUser.execute({
            patient_id,
            doctor_id,
        });

        return response.json(instanceToInstance(user));
    }
    public async findFavorite(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const patient_id  = request.user.id;
        const findFavorite = container.resolve(FavoriteDoctorService);

        const user = await findFavorite.execute({
            patient_id
        })

        return response.json(instanceToInstance(user));
    }
}
