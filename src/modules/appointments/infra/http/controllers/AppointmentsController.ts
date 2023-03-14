import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import DeleteAppointmentsService from '@modules/appointments/services/DeleteAppointment';

export default class AppointmentsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const { provider_id, date, idRoom } = request.body;

        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({
            provider_id,
            user_id,
            date,
            idRoom,
        });

        return response.json(appointment);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { appointment_id } = request.body;

        const deleteAppointment = container.resolve(DeleteAppointmentsService);

        try {
            await deleteAppointment.delete(appointment_id);
            return response.json('Appointement deleted successfully');
        } catch (error) {
            return response.json(error);
        }
    }
}
