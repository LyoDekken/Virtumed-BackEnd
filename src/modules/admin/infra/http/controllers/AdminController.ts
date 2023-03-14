import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import CreateUsersService from '@modules/admin/services/create/CreateUsersServices';
import DeleteUsersService from '@modules/admin/services/delete/DeleteUsersServices';

export default class AdminsController {
    public async createClinic(
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

        const createUser = container.resolve(CreateUsersService);

        const user = await createUser.CreateClinic({
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

    public async createPacient(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            name,
            cep,
            cpf,
            rg,
            address,
            number,
            city,
            district,
            state,
            email,
            password,
        } = request.body;

        const createUser = container.resolve(CreateUsersService);

        const user = await createUser.CreatePacient({
            name,
            cep,
            cpf,
            rg,
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

    public async createDoctor (
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            name,
            cep,
            address,
            number,
            city,
            district,
            state,
            email,
            cpf,
            crm,
            speciality,
            password,
        } = request.body;

        const createUser = container.resolve(CreateUsersService);

        const user = await createUser.CreateDoctor({
            name,
            cep,
            address,
            number,
            city,
            district,
            state,
            email,
            cpf,
            crm,
            speciality,
            password,
        });

        return response.json(instanceToInstance(user));
    }

    public async delete (
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.body;

        const deleteUser = container.resolve(DeleteUsersService);

        try {
            await deleteUser.delete(id);
            return response.json("User deleted successfully");
        } catch (error) {
            return response.json(error)
        }
    }
}
