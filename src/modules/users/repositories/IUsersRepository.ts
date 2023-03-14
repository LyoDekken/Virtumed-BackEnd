import User from "../infra/typeorm/entities/User";
import IFindAllProvidersDTO from "../dtos/IFindAllProvidersDTO";

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined |  null>;
  findClinicId(id: string): Promise<User | undefined |  null>;
  findDoctorId(id: string): Promise<User | undefined |  null>;
  findPacientId(id: string): Promise<User | undefined |  null>;
  findByEmail(email: string): Promise<User | undefined | null>;
  save(user: User): Promise<User>;
}
