import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import authAdmin from '@auth/auth.admin';
import AdminsController from '../controllers/AdminController';
import ProfileAdiminController from '../controllers/ProfileAdminController';
//import ProfileControllerForAdiminController from '../controllers/ProfileClinicForAdminController';

const adminsRouter = Router();
const adminsController = new AdminsController();
const updateAdminsController = new ProfileAdiminController();
//const updateClinicForAdminsController = new ProfileControllerForAdiminController();

adminsRouter.post(
    '/doctor',
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
    adminsController.createDoctor
);

adminsRouter.post(
    '/clinic',
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
    adminsController.createClinic
);

adminsRouter.post(
    '/pacient',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            rg: Joi.string().required(),
            cpf: Joi.string().required(),
            cep: Joi.string().required(),
            address: Joi.string().required(),
            number: Joi.string().required(),
            city: Joi.string().required(),
            district: Joi.string().required(),
            state: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
        },
    }),
    adminsController.createPacient
);

adminsRouter.put(
    '/pacient',
    authAdmin,
    celebrate({
        [Segments.BODY]: {
            id: Joi.string().required(),
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
    updateAdminsController.updatePacient
);

adminsRouter.put(
    '/doctor',
    authAdmin,
    celebrate({
        [Segments.BODY]: {
            id: Joi.string().required(),
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
    updateAdminsController.updateDoctor
);

adminsRouter.put(
    '/clinic',
    authAdmin,
    celebrate({
        [Segments.BODY]: {
            id: Joi.string().required(),
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
    updateAdminsController.updateClinic
);

adminsRouter.delete(
    '/delete',
    authAdmin,
    celebrate({
        [Segments.BODY]: {
            id: Joi.string().required(),
        },
    }),
    adminsController.delete
);

export default adminsRouter;
