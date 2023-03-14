import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';

import authMiddleware from '@auth/auth';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(authMiddleware);

profileRouter.get('/', profileController.show);

profileRouter.get('/doctor', profileController.showProfileDoctor);

profileRouter.get('/clinic', profileController.showProfileClinic);

profileRouter.get('/pacient', profileController.showProfilePacient);

profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            password: Joi.string(),
            password_confirmation: Joi.string().valid(Joi.ref('password')),
        },
    }),
    profileController.update,
);

profileRouter.post(
    '/findPacient',
    celebrate({
        [Segments.BODY]: {
            id: Joi.string().uuid().required(),
        },
    }),
    profileController.findPacientId,
);

profileRouter.post(
    '/findDoctor',
    celebrate({
        [Segments.BODY]: {
            id: Joi.string().required(),
        },
    }),
    profileController.findDoctorId,
);

profileRouter.post(
    '/findClinic',
    celebrate({
        [Segments.BODY]: {
            id: Joi.string().required(),
        },
    }),
    profileController.findClinicId,
);

export default profileRouter;
