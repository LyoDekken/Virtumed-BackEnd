import ICreateClinicDTO from "@modules/clinic/dtos/ICreateClinicDTO";
import ICreatePacientDTO from "@modules/pacient/infra/dtos/ICreatePacientDTO";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import User from "@modules/users/infra/typeorm/entities/User";

export default interface IAdiminRepository {
    updateDoctor(id: string): Promise<User | null>;
    updatePacient(id: string): Promise<User | null>;
    updateClinic(id: string): Promise<User | null>;
    findById(id: string): Promise<User | undefined | null>;
    findByEmail(email: string): Promise<User | undefined | null>;
    createDoctor(data: ICreateUserDTO): Promise<User>;
    createPacient(data: ICreatePacientDTO): Promise<User>;
    createClinic(data: ICreateClinicDTO): Promise<User>;
    save(user: User): Promise<User>;

    findAll(): Promise<User[]>;
    delete(id: string): Promise<void>;
}
