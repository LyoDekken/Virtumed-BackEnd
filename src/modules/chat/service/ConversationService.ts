import { inject, injectable } from 'tsyringe';
import ITwoConversationDTO from '../dtos/ITwoConversatiosDTO';
import Conversation from '../infra/typeorm/schemas/Conversation';
import IConversationRepository from '../repositories/IConversationRepository';

@injectable()
class ConversationService {
    constructor(
        @inject('ConversationsRepository')
        private conversationResitory: IConversationRepository,
    ) {}

    public async execute(user_id: string): Promise<Conversation[] | undefined> {
        const conversation = await this.conversationResitory.findConversation(
            user_id,
        );

        return conversation;
    }

    public async twoUsers({
        firstUserId,
        secondUserId,
    }: ITwoConversationDTO): Promise<Conversation | null> {
        const conversation =
            await this.conversationResitory.findTwoConversation({
                firstUserId,
                secondUserId,
            });

        return conversation;
    }
}

export default ConversationService;
