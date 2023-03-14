import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import User from "@modules/users/infra/typeorm/entities/User";

export default interface IDoctorRepository {
    updateDoctor(id: string): Promise<User | null>;
    findById(id: string): Promise<User | undefined | null>;
    findByEmail(email: string): Promise<User | undefined | null>;
    createDoctor(data: ICreateUserDTO): Promise<User>;
    findAllDoctors(): Promise<User[] | null>;
    save(user: User): Promise<User>;
}

