import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import CreateClinicService from '@modules/clinic/services/create/CreateClinicService';
import ClinicService from '@modules/clinic/services/ClinicService';
import CreateDoctorForClinicService from '@modules/clinic/services/create/CreateDoctorForClinicService';
import CreatePacientForClinicService from '@modules/clinic/services/create/CreatePacientForClinicService';

export default class ClinicsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            name,
            razao,
            cnpj,
            cep,
            address,
            number,
            city,
            district,
            state,
            email,
            password,
        } = request.body;

        const createUser = container.resolve(CreateClinicService);

        const user = await createUser.execute({
            name,
            razao,
            cnpj,
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

    public async findAllClinics(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const findAllClinics = container.resolve(ClinicService);

        const allClinics = await findAllClinics.execute();

        return response.json(instanceToInstance(allClinics));
    }
    public async findDoctorsAndPacients(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const userId = request.user.id;

        const findAllClinics = container.resolve(ClinicService);

        const allClinics = await findAllClinics.findAllofClinic(userId);

        return response.json(instanceToInstance(allClinics));
    }

    public async createDoctorforClinic(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const id = request.user.id;
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

        const createUser = container.resolve(CreateDoctorForClinicService);

        const user = await createUser.execute({
            id,
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

    public async createPacientforClinic(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const id = request.user.id;
        const {
            name,
            email,
            password,
            address,
            cep,
            city,
            cpf,
            rg,
            district,
            number,
            state,
        } = request.body;

        const createUser = container.resolve(CreatePacientForClinicService);

        const user = await createUser.execute({
            id,
            name,
            email,
            password,
            address,
            cep,
            city,
            cpf,
            rg,
            district,
            number,
            state,
        });

        return response.json(instanceToInstance(user));
    }
}
