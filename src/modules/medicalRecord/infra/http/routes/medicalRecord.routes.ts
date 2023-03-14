import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import authDoctor from '@shared/infra/http/middlewares/auth.doctor';
import authPatient from '@shared/infra/http/middlewares/auth.patient';
import MedicalRecordController from '../controllers/MedicalRecordController';

const medicalRecord = Router();
const medicalRecordController = new MedicalRecordController();

medicalRecord.post(
    '/',
    authDoctor,
    celebrate({
        [Segments.BODY]: {
            pacientId: Joi.string().required(),
            diagnosis: Joi.string().required(),
            observations: Joi.string().required(),
            date: Joi.date(),
        },
    }),
    medicalRecordController.create,
);

medicalRecord.get(
    '/me/patient',
    authPatient,
    medicalRecordController.findForPatient,
);

medicalRecord.get(
    '/me/doctor',
    authDoctor,
    medicalRecordController.findForDoctor,
);

medicalRecord.get(
    '/patient',
    authDoctor,
    celebrate({
        [Segments.BODY]: {
            id: Joi.string().required(),
        },
    }),
    medicalRecordController.findForPatientBody,
);

/* medicalRecord.get(
    '/doctor',
    authMiddleware,
    celebrate({
        [Segments.BODY]: {
            id: Joi.string().required(),
        },
    }),
    medicalRecordController.findForPatient,
); */

export default medicalRecord;
