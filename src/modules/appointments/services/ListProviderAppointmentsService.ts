import { injectable, inject } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

interface IRequestPatint {
    user_id: string;
    day: number;
    month: number;
    year: number;
}

@injectable()
class ListProvidersAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        provider_id,
        day,
        month,
        year,
    }: IRequest): Promise<Appointment[]> {
        const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

        let appointments = await this.cacheProvider.recover<Appointment[]>(
            cacheKey,
        );

        if (!appointments) {
            appointments =
                await this.appointmentsRepository.findAllInDayFromProvider({
                    provider_id,
                    day,
                    month,
                    year,
                });

            await this.cacheProvider.save(
                cacheKey,
                instanceToInstance(appointments),
            );
        }
        return appointments;
    }

    public async executeForClinicAppointmentsOfDoctor({
        provider_id,
        day,
        month,
        year,
    }: IRequest): Promise<Appointment[] | undefined> {
        const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

        let appointments = await this.cacheProvider.recover<Appointment[]>(
            cacheKey,
        );

        if (!appointments) {
            appointments =
                await this.appointmentsRepository.findAllInDayFromProvider({
                    provider_id,
                    day,
                    month,
                    year,
                });

            return appointments;
        }
    }

    public async executeForClinicAppointmentsOfPatient({
        user_id,
        day,
        month,
        year,
    }: IRequestPatint): Promise<Appointment[] | undefined> {
        const cacheKey = `provider-appointments:${user_id}:${year}-${month}-${day}`;

        let appointments = await this.cacheProvider.recover<Appointment[]>(
            cacheKey,
        );

        if (!appointments) {
            appointments =
                await this.appointmentsRepository.findAllInDayFromProviderPatient({
                    user_id,
                    day,
                    month,
                    year,
                });

            return appointments;
        }
    }

    public async allForDoctor(provider_id: string): Promise<Appointment[]> {
        const appointments =
            await this.appointmentsRepository.findAllIAppointmentForDoctor({
                provider_id,
            });

        return appointments;
    }

    public async allForPatient(user_id: string): Promise<Appointment[]> {
        const appointments =
            await this.appointmentsRepository.findAllIAppointmentForPatient({
                user_id,
            });

        return appointments;
    }
}

export default ListProvidersAppointmentsService;
