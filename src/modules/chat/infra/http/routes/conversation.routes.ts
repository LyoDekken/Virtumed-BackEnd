import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ConversationsController from '../controllers/ConversationsController';
import authMiddleware from "@auth/auth";

const conversationsRouter = Router();
const conversationsController = new ConversationsController();

conversationsRouter.use(authMiddleware);

conversationsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            senderId: Joi.string().required(),
            receiverId: Joi.string().required(),
        },
    }),
    conversationsController.create,
);

conversationsRouter.get(
    '/:user_id',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().required(),
        },
    }),
    conversationsController.findConversation,
);

conversationsRouter.get(
    '/:firstUserId/:seconUserdId',
    celebrate({
        [Segments.PARAMS]: {
            firstUserId: Joi.string().required(),
            seconUserdId: Joi.string().required(),
        },
    }),
    conversationsController.findTwoConversation,
);

export default conversationsRouter;
