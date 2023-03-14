import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';
import IFindAllAppointments from '../dtos/IFindAllAppointmentsDTO';
import IFindAllInDayFromProviderPatient from '../dtos/IFindAllInDayFromProviderPatientDTO';
import IFindAllAppointmentsPatient from '../dtos/IFindAllAppointmentsPatientDTO';

export default interface IAppointmentsRepository {
    findAllIAppointmentForDoctor({
        provider_id,
    }: IFindAllAppointments): Promise<Appointment[]>;
    findAllIAppointmentForPatient({
        user_id,
    }: IFindAllAppointmentsPatient): Promise<Appointment[]>;
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined | null>;
    findByDatePatient(
        date: Date,
        user_id: string,
    ): Promise<Appointment | undefined | null>;
    findAllInMonthFromProvider(
        data: IFindAllInMonthFromProviderDTO,
    ): Promise<Appointment[]>;
    findAllInDayFromProvider(
        data: IFindAllInDayFromProviderDTO,
    ): Promise<Appointment[]>;
    findAllInDayFromProviderPatient({
        user_id,
        day,
        month,
        year,
    }: IFindAllInDayFromProviderPatient): Promise<Appointment[]>;
    delete(appointment_id: string): Promise<void>;
}
