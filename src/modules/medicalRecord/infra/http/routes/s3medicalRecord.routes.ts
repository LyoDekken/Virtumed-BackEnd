import { Router } from 'express';

import authDoctor from '@shared/infra/http/middlewares/auth.doctor';
import S3CreateFileMedicalRecordController from '../controllers/S3MedicalRecordController';

import multer from 'multer';
import uploadConfig from '@config/upload';

const s3medicalRecord = Router();
const s3medicalRecordController = new S3CreateFileMedicalRecordController()

const upload = multer(uploadConfig.multer);

s3medicalRecord.post(
    '/send',
    authDoctor,
    upload.single('diagnosis_file'),
    s3medicalRecordController.create,
);

export default s3medicalRecord;
