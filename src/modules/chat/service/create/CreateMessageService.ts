import IMessageRepository from '@modules/chat/repositories/IMessageRepository';
import { inject, injectable } from 'tsyringe';

import Message from '@modules/chat/infra/typeorm/schemas/Message';

interface IRequest {
    conversationId: string;
    sender: string;
    text: string;
}

@injectable()
class CreateMessageService {
    constructor(
        @inject('MessageRepository')
        private messageRepository: IMessageRepository,
    ) {}

    public async execute({
        conversationId ,
        sender,
        text,
    }: IRequest): Promise<Message> {
        const addMessage = await this.messageRepository.addMessage({
            conversationId,
            sender,
            text,
        });

        return addMessage;
    }
}

export default CreateMessageService;
