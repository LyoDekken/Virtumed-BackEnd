import User from '@modules/users/infra/typeorm/entities/User';
import ICreateInfoPacientDTO from '../dtos/ICreateInfoPacientDTO';
import PatientInfo from '../infra/typeorm/entities/InfoPacient';

export default interface IInfoPacientRepository {
    createInfoPacient(data: ICreateInfoPacientDTO): Promise<PatientInfo | null>;
    findInfoPatientForDoctor(id: string): Promise<PatientInfo[] | null>
    findInfoPatient(id: string): Promise<PatientInfo[] | null>
    findById(id: string): Promise<User | undefined | null>;
    findByEmail(email: string): Promise<User | undefined | null>;
    save(user: User): Promise<User>;
}
