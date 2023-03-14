import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PacientsController from '../controllers/PacientsController';

import authMiddleware from '@auth/auth';
import ProfilePacientController from '../controllers/ProfilePacientController';

const pacientRouter = Router();
const pacientsController = new PacientsController();
const updatePacientsController = new ProfilePacientController();

pacientRouter.post(
    '/',
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
    pacientsController.create,
);

pacientRouter.get('/', authMiddleware, pacientsController.findAllPacients);

pacientRouter.put(
    '/',
    authMiddleware,
    celebrate({
        [Segments.BODY]: {
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
    updatePacientsController.updatePacient,
);

export default pacientRouter;
