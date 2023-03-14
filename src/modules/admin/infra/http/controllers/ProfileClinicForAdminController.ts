import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import UpdateClinicForAdminService from '@modules/admin/services/update/UpdateClinicsForAdminService';

export default class ProfileControllerForAdiminController {
    public async updateClinic(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id, razao, cnpj, cep, address, number, city, district, state } =
            request.body;

        const updateUser = container.resolve(UpdateClinicForAdminService);

        const user = await updateUser.execute({
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
}
