import ICreateDoctorDTO from "@modules/doctor/dtos/ICreateDoctorDTO";
import ICreatePacientDTO from "@modules/pacient/infra/dtos/ICreatePacientDTO";
import User from "@modules/users/infra/typeorm/entities/User";
import ICreateClinicDTO from "../dtos/ICreateClinicDTO";

export default interface IClinicRepository {
    updateClinic(id: string): Promise<User | null>;
    findById(id: string): Promise<User | undefined | null>;
    findByEmail(email: string): Promise<User | undefined | null>;
    createClinic(data: ICreateClinicDTO): Promise<User>;
    createDoctorforClinic(data: ICreateDoctorDTO): Promise<User | null>;
    createPacientforClinic(data: ICreatePacientDTO): Promise<User | null>;
    findAllClinics(): Promise<User[] | null>;
    findDoctorsAndPacients(userId: string): Promise<User[] | null>;
    save(user: User): Promise<User>;
}

