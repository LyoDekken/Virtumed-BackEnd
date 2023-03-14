import IFavoriteDoctorsRepository from '@modules/favoriteDoctor/repositories/IFavoriteDoctorRepository';
import { PostgresDataSource } from '@shared/infra/typeorm/index';
import { In, Repository } from 'typeorm';
import FavoriteDoctor from '../entities/FavoriteDoctor';
import AppError from '@shared/errors/AppError';
import { ICreateFavoriteDoctorDto } from '@modules/favoriteDoctor/dtos/ICreateFavoriteDoctorDto';
import User from '@modules/users/infra/typeorm/entities/User';
import * as _ from 'lodash';

class FavoriteDoctorsRepository implements IFavoriteDoctorsRepository {
    private ormRepository: Repository<FavoriteDoctor>;
    private userOrmRepository: Repository<User>;

    constructor() {
        this.ormRepository = PostgresDataSource.getRepository(FavoriteDoctor);
        this.userOrmRepository = PostgresDataSource.getRepository(User);
    }

    public async addFavoriteDoctor({
        doctor_id,
        patient_id,
    }: ICreateFavoriteDoctorDto): Promise<FavoriteDoctor> {
        const userPatient = await this.userOrmRepository.findOne({
            where: {
                id: patient_id,
            },
            relations: ['pacient'],
        });

        const userDoctor = await this.userOrmRepository.findOne({
            where: {
                id: doctor_id,
            },
            relations: ['doctor'],
        });

        const favorite = this.ormRepository.create({
            doctor: {
                id: userDoctor?.doctor.id,
            },
            patient: {
                id: userPatient?.pacient.id,
            },
        });

        await this.ormRepository.save(favorite);

        return favorite;
    }

    public async remove({
        doctor_id,
        patient_id,
    }: ICreateFavoriteDoctorDto): Promise<void> {
        const userPatient = await this.userOrmRepository.findOne({
            where: {
                id: patient_id,
            },
            relations: ['pacient'],
        });

        const userDoctor = await this.userOrmRepository.findOne({
            where: {
                id: doctor_id,
            },
            relations: ['doctor'],
        });

        const favorite = await this.ormRepository.find({
            where: {
                doctor: {
                    id: userDoctor?.doctor.id,
                },
                patient: {
                    id: userPatient?.pacient.id,
                },
            },
        });

        if (!favorite) {
            throw new AppError(
                'Doctor not found as a favorite for this patient',
            );
        }

        await this.ormRepository.remove(favorite);
    }

    public async findFavorites(patient_id: string): Promise<any[]> {
        const userPatient = await this.userOrmRepository.findOne({
            where: {
                id: patient_id,
            },
            relations: ['pacient'],
        });

        const favorites = await this.ormRepository.find({
            where: {
                patient: {
                    id: userPatient?.pacient.id,
                },
            },
            relations: ['doctor'],
        });

        const value = await this.userOrmRepository.find({
            where: {
                doctor: In(favorites.map(favorite => favorite?.doctor_id)),
            },
            relations: ['doctor'],
        });

        const filteredData = value.map(item =>
            _.omit(item, [
                'created_at',
                'updated_at',
                'avatar',
                'password',
                'doctor.cep',
                'doctor.cpf',
                'doctor.address',
                'doctor.number',
                'doctor.district',
                'doctor.city',
                'doctor.state',
                'doctor.created_at',
                'doctor.updated_at',
            ]),
        );

        return filteredData;
    }
}

export default FavoriteDoctorsRepository;
