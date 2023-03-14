import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import UserAvatarController from '../controllers/UserAvatarController';

import authMiddleware from '@shared/infra/http/middlewares/auth';

const usersRouter = Router();

const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

usersRouter.patch(
    '/avatar',
    authMiddleware,
    upload.single('avatar'),
    userAvatarController.update,
);

usersRouter.put(
    '/avatar-url',
    authMiddleware,
    celebrate({
        [Segments.BODY]: {
            avatar_filename: Joi.string().required(),
        },
    }),
    userAvatarController.UpdateUrlUserAvatarController,
);

export default usersRouter;
