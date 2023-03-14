import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IUsersTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import DoctorsRepository from '@modules/doctor/infra/typeorm/repositories/DoctorsRepository';
import IDoctorRepository from '@modules/doctor/repositories/IDoctorRepository';

import ClinicsRepository from '@modules/clinic/infra/typeorm/repositories/ClinicsRepository';
import IClinicRepository from '@modules/clinic/repositories/IClinicsRepository';

import AdminsRepository from '@modules/admin/infra/typeorm/repositories/AdminsRepository';
import IAdiminRepository from '@modules/admin/repositories/IAdminRepository';

import ConversationsRepository from '@modules/chat/infra/typeorm/repositories/ConversationRepository';
import IConversationRepository from '@modules/chat/repositories/IConversationRepository';

import MessageRepository from '@modules/chat/infra/typeorm/repositories/MessageRepository';
import IMessageRepository from '@modules/chat/repositories/IMessageRepository';

import PacientsRepository from '@modules/pacient/infra/typeorm/repositories/PacientsRepository';
import IPacientRepository from '@modules/pacient/repositories/IPacientRepository';

import IInfoPacientRepository from '@modules/infoPacient/repositories/IInfoPacientRepository';
import InfoPacientRepository from '@modules/infoPacient/infra/typeorm/repositories/InfoPacientRepository';

import IMedicalRecordRepository from '@modules/medicalRecord/repositories/IMedicalRecord';
import MedicalRecordRepository from '@modules/medicalRecord/infra/typeorm/repositories/MedicalRepository';

import FavoriteDoctorsRepository from '@modules/favoriteDoctor/infra/typeorm/repositories/FavoriteDoctorRepository';
import IFavoriteDoctorsRepository from '@modules/favoriteDoctor/repositories/IFavoriteDoctorRepository';

container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository,
);

container.registerSingleton<IInfoPacientRepository>(
    'InfoPacientRepository',
    InfoPacientRepository,
);

container.registerSingleton<IMedicalRecordRepository>(
    'MedicalRecordRepository',
    MedicalRecordRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IAdiminRepository>(
    'AdminsRepository',
    AdminsRepository,
);

container.registerSingleton<IDoctorRepository>(
    'DoctorsRepository',
    DoctorsRepository,
);

container.registerSingleton<IClinicRepository>(
    'ClinicsRepository',
    ClinicsRepository,
);

container.registerSingleton<IPacientRepository>(
    'PacientsRepository',
    PacientsRepository,
);

container.registerSingleton<IUsersTokensRepository>(
    'UserTokensRepository',
    UsersTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
    'NotificationsRepository',
    NotificationsRepository,
);

container.registerSingleton<IConversationRepository>(
    'ConversationsRepository',
    ConversationsRepository,
);

container.registerSingleton<IMessageRepository>(
    'MessageRepository',
    MessageRepository,
);

container.registerSingleton<IFavoriteDoctorsRepository>(
    'FavoriteDoctorsRepository',
    FavoriteDoctorsRepository,
);
