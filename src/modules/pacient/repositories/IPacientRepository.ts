import User from '@modules/users/infra/typeorm/entities/User';
import ICreatePacientDTO from '../infra/dtos/ICreatePacientDTO';

export default interface IPacientRepository {
    updatePacient(id: string): Promise<User | null>;
    findById(id: string): Promise<User | undefined | null>;
    findByEmail(email: string): Promise<User | undefined | null>;
    createPacient(data: ICreatePacientDTO): Promise<User>;
    findAllPacients(): Promise<User[] | null>;
    save(user: User): Promise<User>;
}
