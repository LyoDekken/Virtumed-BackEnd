import ICreateDoctorDTO from '@modules/doctor/dtos/ICreateDoctorDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateClinicDTO from '../dtos/ICreateClinicDTO';

export default interface IClinicRepository {
    findDoctorsAndPacients(userId: string): Promise<User[] | null>
    createDoctorforClinic(
        userData: ICreateDoctorDTO,
    ): Promise<User | null>
    updateClinic(id: string): Promise<User | null>
    findById(id: string): Promise<User | undefined | null>;
    findByEmail(email: string): Promise<User | undefined | null>;
    save(user: User): Promise<User>;
    findAllClinics(): Promise<User[] | null>
}
