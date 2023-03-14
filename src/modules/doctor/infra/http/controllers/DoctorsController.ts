import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import CreateDoctorService from '../../../services/create/CreateDoctorService';
import DoctorService from '@modules/doctor/services/DoctorService';

export default class DoctorsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            name,
            email,
            password,
            address,
            cep,
            city,
            cpf,
            crm,
            district,
            number,
            speciality,
            state,
        } = request.body;

        const createUser = container.resolve(CreateDoctorService);

        const user = await createUser.execute({
            name,
            email,
            password,
            address,
            cep,
            city,
            cpf,
            crm,
            district,
            number,
            speciality,
            state,
        });

        return response.json(instanceToInstance(user));
    }

    public async findAllDoctors(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const findAllDoctors = container.resolve(DoctorService);

        const allDoctors = await findAllDoctors.execute();

        return response.json(instanceToInstance(allDoctors));
    }
}
