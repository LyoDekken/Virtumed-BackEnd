import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import CreateInfoPacientService from '@modules/infoPacient/services/create/CreateInfoPacientService';
import InfoPacientService from '@modules/infoPacient/services/InfoPacientService';

export default class InfoPacientController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id, age, gender, height, weight } = request.body;

        const infoPacientUser = container.resolve(CreateInfoPacientService);

        const data = await infoPacientUser.execute({
            id,
            age,
            gender,
            height,
            weight,
        });

        return response.json(instanceToInstance(data));
    }

    public async findInfoPatient(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const id = request.user.id;

        const infoPacientUser = container.resolve(InfoPacientService);

        const data = await infoPacientUser.execute(id);

        return response.json(instanceToInstance(data));
    }

    public async findInfoPatientForDoctor(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.body;

        const infoPacientUser = container.resolve(InfoPacientService);

        const data = await infoPacientUser.executeForDoctor(id);

        return response.json(instanceToInstance(data));
    }
}
