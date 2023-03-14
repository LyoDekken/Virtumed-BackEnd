import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import CreatePacientService from '@modules/pacient/services/create/CreatePacientService';
import PacientService from '@modules/pacient/services/PacientService';

export default class PacientsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            name,
            rg,
            cpf,
            cep,
            address,
            number,
            city,
            district,
            state,
            email,
            password,
        } = request.body;

        const createUser = container.resolve(CreatePacientService);

        const user = await createUser.execute({
            name,
            rg,
            cpf,
            cep,
            address,
            number,
            city,
            district,
            state,
            email,
            password,
        });

        return response.json(instanceToInstance(user));
    }

    public async findAllPacients(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const findAllPacients = container.resolve(PacientService);

        const allClinics = await findAllPacients.execute();

        return response.json(instanceToInstance(allClinics));
    }
}
