import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import UpdateAdminsService from '@modules/admin/services/update/UpdatesUsersService';

export default class ProfileAdiminController {
    public async updateClinic(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id, razao, cnpj, cep, address, number, city, district, state } =
            request.body;

        const updateUser = container.resolve(UpdateAdminsService);

        const user = await updateUser.updateClinic({
            id,
            razao,
            cnpj,
            cep,
            address,
            number,
            city,
            district,
            state,
        });

        return response.json(instanceToInstance(user));
    }

    public async updatePacient(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id, cep, rg, cpf, address, number, city, district, state } =
            request.body;

        const updateUser = container.resolve(UpdateAdminsService);

        const user = await updateUser.updatePacient({
            id,
            cep,
            rg,
            cpf,
            address,
            number,
            city,
            district,
            state
        });

        return response.json(instanceToInstance(user));
    }

    public async updateDoctor(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            id,
            cep,
            cpf,
            crm,
            address,
            number,
            city,
            district,
            state,
            speciality,
        } = request.body;

        const updateUser = container.resolve(UpdateAdminsService);

        const user = await updateUser.updateDoctor({
            id,
            cep,
            cpf,
            crm,
            address,
            number,
            city,
            district,
            state,
            speciality,
        });

        return response.json(instanceToInstance(user));
    }
}
