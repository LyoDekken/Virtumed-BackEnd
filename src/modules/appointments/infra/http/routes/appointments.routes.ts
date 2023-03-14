import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import authMiddleware from '@auth/auth';
import authClinic from '@auth/auth.clinic';
import authTwo from '@auth/auth.two';

import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.post(
    '/',
    authMiddleware,
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
            date: Joi.date(),
            idRoom: Joi.string().required(),
        },
    }),
    appointmentsController.create,
);

appointmentsRouter.get(
    '/me',
    authMiddleware,
    providerAppointmentsController.index,
);

appointmentsRouter.get(
    '/forDoctor',
    authTwo,
    celebrate({
        [Segments.BODY]: {
            appointment_id: Joi.string().required(),
        },
    }),
    providerAppointmentsController.allForDoctor,
);

appointmentsRouter.get(
    '/forPatient',
    authMiddleware,
    celebrate({
        [Segments.BODY]: {
            user_id: Joi.string().required(),
        },
    }),
    providerAppointmentsController.allForPatient,
);

appointmentsRouter.get(
    '/doctor',
    authClinic,
    celebrate({
        [Segments.BODY]: {
            appointment_id: Joi.string().required(),
        },
    }),
    providerAppointmentsController.clinicIndexForDoctor,
);

appointmentsRouter.get(
    '/patient',
    authClinic,
    celebrate({
        [Segments.BODY]: {
            user_id: Joi.string().required(),
        },
    }),
    providerAppointmentsController.clinicIndexforPatient,
);

appointmentsRouter.delete(
    '/delete',
    authMiddleware,
    celebrate({
        [Segments.BODY]: {
            appointment_id: Joi.string().required(),
        },
    }),
    appointmentsController.delete,
);

export default appointmentsRouter;
