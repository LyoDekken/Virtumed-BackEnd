import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDelete {
    appointment_id: string;
}

@injectable()
class DeleteAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async delete({ appointment_id }: IRequestDelete): Promise<void> {
        await this.appointmentsRepository.delete(appointment_id)
    }
}

export default DeleteAppointmentsService;
