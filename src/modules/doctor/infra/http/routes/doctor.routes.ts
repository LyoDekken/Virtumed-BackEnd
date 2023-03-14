import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import DoctorsController from '../controllers/DoctorsController';
import authMiddleware from '@shared/infra/http/middlewares/auth';
import ProfileDoctorController from '../controllers/ProfileDoctorController';

const doctorsRouter = Router();

const doctorsController = new DoctorsController();
const updateDoctorsController = new ProfileDoctorController();

doctorsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            cpf: Joi.string().required(),
            crm: Joi.string().required(),
            cep: Joi.string().required(),
            address: Joi.string().required(),
            number: Joi.string(),
            city: Joi.string().required(),
            district: Joi.string().required(),
            state: Joi.string().required(),
            speciality: Joi.string().required(),
        },
    }),
    doctorsController.create,
);

doctorsRouter.get('/', authMiddleware, doctorsController.findAllDoctors);

doctorsRouter.put(
    '/',
    authMiddleware,
    celebrate({
        [Segments.BODY]: {
            cpf: Joi.string().required(),
            crm: Joi.string().required(),
            cep: Joi.string().required(),
            address: Joi.string().required(),
            number: Joi.string() || Joi.number(),
            city: Joi.string().required(),
            district: Joi.string().required(),
            state: Joi.string().required(),
            speciality: Joi.string().required(),
        },
    }),
    updateDoctorsController.updateDoctor,
);

export default doctorsRouter;
