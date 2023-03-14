import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import authPatient from '@shared/infra/http/middlewares/auth.patient';
import authDoctor from '@shared/infra/http/middlewares/auth.doctor';
import InfoPacientController from '../controllers/InfoPacientController';

const infoPacient = Router();
const infoPacientController = new InfoPacientController();

infoPacient.post(
    '/',
    authDoctor,
    celebrate({
        [Segments.BODY]: {
            id: Joi.string().required(),
            age: Joi.string().required(),
            height: Joi.string().required(),
            gender: Joi.string().required(),
            weight: Joi.string().required(),
        },
    }),
    infoPacientController.create,
);

infoPacient.get('/', authPatient, infoPacientController.findInfoPatient);

infoPacient.get(
    '/doctor',
    authDoctor,
    celebrate({
        [Segments.BODY]: {
            id: Joi.string().required(),
        },
    }),
    infoPacientController.findInfoPatientForDoctor,
);

export default infoPacient;
