import { inject, injectable } from 'tsyringe';
import IMessageRepository from '../repositories/IMessageRepository';
import Message from '../infra/typeorm/schemas/Message';

@injectable()
class MessageService {
    constructor(
        @inject('MessageRepository')
        private messageResitory: IMessageRepository,
    ) {}

    public async execute(
        conversationId: string,
    ): Promise<Message[] | undefined> {
        const findMessage = await this.messageResitory.findMessage(
            conversationId,
        );

        return findMessage;
    }
}

export default MessageService;
