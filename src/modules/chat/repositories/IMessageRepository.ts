import ICreateMessageDTO from '../dtos/ICreateMessageDTO';
import Message from '../infra/typeorm/schemas/Message';

export default interface IMessageRepository {
    addMessage(data: ICreateMessageDTO): Promise<Message>;
    save(data: Message): Promise<Message>;
    findMessage(conversationId: string): Promise<Message[]>;
}
