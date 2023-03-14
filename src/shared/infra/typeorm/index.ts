import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { DataSource } from 'typeorm';

const portMongoDB = process.env.DB_PORT_MONGO as number | undefined;
const portPostgres = process.env.DB_PORT_POSTGRES as number | undefined;

export const PostgresDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: portPostgres,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ['./dist/modules/**/infra/typeorm/entities/*.js'],
    migrations: ['./dist/shared/infra/typeorm/migrations/*.js'],
    extra: {
        cli: {
            migrationsDir: './dist/shared/infra/typeorm/migrations',
        },
    },
    synchronize: true,
    logging: true,
});

PostgresDataSource.initialize()
    .then(() => {
        console.log('PostgresDataSource has been initialized!');
    })
    .catch(err => {
        console.error('Error during PostgresDataSource initialization', err);
    });

export const MongoDataSource = new DataSource({
    username: process.env.DB_USER_MONGO,
    type: 'mongodb',
    host: process.env.DB_HOST,
    port: portMongoDB,
    database: process.env.DB_NAME,
    useUnifiedTopology: true,
    logging: true,
    entities: ['./dist/modules/**/infra/typeorm/schemas/*.js'],
});

MongoDataSource.initialize()
    .then(() => {
        console.log('MongoDataSource has been initialized!');
    })
    .catch(err => {
        console.error('Error during MongoDataSource initialization', err);
    });
