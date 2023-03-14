import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import { PostgresDataSource } from '@shared/infra/typeorm';

interface ITokenPayload {
    iat: number;
    ext: number;
    sub: string;
}

export default function authClinic(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    const ormRepository = PostgresDataSource.getRepository(User);

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as ITokenPayload;

        request.user = {
            id: sub,
        };

        const id = request.user.id

        async function updateUser (id: string) {
            const user = await ormRepository.findOne({
                where: {
                    id,
                },
            });

            if(user?.role !== "CLINIC"){
                throw new AppError('Invalid JWT token', 401);
            }

            return next();
        }

        updateUser(id)
    } catch (err) {
        throw new AppError('Invalid JWT token', 401);
    }
}
