import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import UpdateDoctorService from '@modules/doctor/services/update/UpdateDoctorService';

export default class ProfileDoctorController {
    public async updateDoctor(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const id = request.user.id;
        const { 
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

        const updateUser = container.resolve(UpdateDoctorService);

        const user = await updateUser.execute({
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
