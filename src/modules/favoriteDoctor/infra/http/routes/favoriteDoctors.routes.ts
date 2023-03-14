import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import authMiddleware from '@auth/auth.patient';

import FavoriteDoctorsController from '../controller/FavoriteDoctorsControllers';

const favoriteDoctorsRouter = Router();
const favoriteDoctorsController = new FavoriteDoctorsController();

favoriteDoctorsRouter.use(authMiddleware);

favoriteDoctorsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            doctor_id: Joi.string().required(),
        },
    }),
    favoriteDoctorsController.create,
);
favoriteDoctorsRouter.get('/findAll', favoriteDoctorsController.findFavorite);

export default favoriteDoctorsRouter;
