import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ClinicsController from '../controllers/ClinicsController';
import authMiddleware from '@auth/auth';
import ProfileClinicController from '../controllers/ProfileClinicController';

const clinicsRouter = Router();
const clinicsController = new ClinicsController();
const updateClinicsController = new ProfileClinicController();

clinicsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            razao: Joi.string().required(),
            cnpj: Joi.string().required(),
            cep: Joi.string().required(),
            address: Joi.string().required(),
            number: Joi.string().required(),
            city: Joi.string().required(),
            district: Joi.string().required(),
            state: Joi.string().required(),
        },
    }),
    clinicsController.create,
);

clinicsRouter.get('/', authMiddleware, clinicsController.findAllClinics);

clinicsRouter.get('/all', authMiddleware, clinicsController.findDoctorsAndPacients);

clinicsRouter.put(
    '/',
    authMiddleware,
    celebrate({
        [Segments.BODY]: {
            razao: Joi.string().required(),
            cnpj: Joi.string().required(),
            cep: Joi.string().required(),
            address: Joi.string().required(),
            number: Joi.string() || Joi.number(),
            city: Joi.string().required(),
            district: Joi.string().required(),
            state: Joi.string().required(),
        },
    }),
    updateClinicsController.updateClinic,
);

clinicsRouter.post(
    '/doctor',
    authMiddleware,
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
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
    clinicsController.createDoctorforClinic,
);

clinicsRouter.post(
    '/pacient',
    authMiddleware,
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            rg: Joi.string().required(),
            cpf: Joi.string().required(),
            cep: Joi.string().required(),
            address: Joi.string().required(),
            number: Joi.string().required(),
            city: Joi.string().required(),
            district: Joi.string().required(),
            state: Joi.string().required(),
        },
    }),
    clinicsController.createPacientforClinic,
);

export default clinicsRouter;
