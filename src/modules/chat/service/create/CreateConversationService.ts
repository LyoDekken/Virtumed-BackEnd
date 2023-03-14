import { inject, injectable } from 'tsyringe';

import Conversation from '@modules/chat/infra/typeorm/schemas/Conversation';
import IConversationRepository from '@modules/chat/repositories/IConversationRepository';

interface IRequest {
    senderId: string;
    receiverId: string;
}

@injectable()
class CreateConversationService {
    constructor(
        @inject('ConversationsRepository')
        private conversationsRepository: IConversationRepository,
    ) {}

    public async execute({
        senderId,
        receiverId,
    }: IRequest): Promise<Conversation> {
        const newConveration = await this.conversationsRepository.createConversation({
            senderId,
            receiverId,
        });

        return newConveration;
    }
}

export default CreateConversationService;
