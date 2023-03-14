import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import S3MedicalRecordService from '@modules/medicalRecord/services/S3MedicalRecordService';

export default class S3CreateFileMedicalRecordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const createS3MedicalRecord = container.resolve(S3MedicalRecordService);

        const id = request.user.id
        const { pacient_id, diagnosis } = request.query;

        const FileMedicalRecord = await createS3MedicalRecord.execute({
            id,
            diagnosis: String(diagnosis),
            pacient_id: String(pacient_id),
            diagnosis_file: request.file.filename,
        });

        return response.json(instanceToInstance(FileMedicalRecord));
    }
}
