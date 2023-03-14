import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import UpdatePacientService from '@modules/pacient/services/update/UpdatePacientService';

export default class ProfilePacietController {
    public async updatePacient(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const id = request.user.id;
        const {
            rg,
            cpf,
            cep,
            address,
            number,
            city,
            district,
            state,
        } = request.body;

        const updateUser = container.resolve(UpdatePacientService);

        const user = await updateUser.execute({
            id,
            rg,
            cpf,
            cep,
            address,
            number,
            city,
            district,
            state,
        });

        return response.json(instanceToInstance(user));
    }
}
