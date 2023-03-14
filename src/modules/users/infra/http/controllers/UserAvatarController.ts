import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/update/UpdateUserAvatarService';

export default class UserAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatar_filename: request.file.filename,
        });

        return response.json(instanceToInstance(user));
    }

    public async UpdateUrlUserAvatarController(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);

        const { avatar_filename } = request.body;

        const user = await updateUserAvatar.UpdateUrlUserAvatarService({
            user_id: request.user.id,
            avatar_filename,
        });

        return response.json(instanceToInstance(user));
    }
}
