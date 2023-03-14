import IMessageRepository from '@modules/chat/repositories/IMessageRepository';
import Message from '../schemas/Message';
import { MongoRepository, Repository } from 'typeorm';
import { MongoDataSource, PostgresDataSource } from '@shared/infra/typeorm';
import ICreateMessageDTO from '@modules/chat/dtos/ICreateMessageDTO';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

class MessageRepository implements IMessageRepository {
    private ormRepository: MongoRepository<Message>;
    private postgresRepository: Repository<User>;

    constructor() {
        this.ormRepository = MongoDataSource.getMongoRepository(Message);
        this.postgresRepository = PostgresDataSource.getRepository(User);
    }

    public async findUserById(id: string): Promise<User | null> {
        const user = await this.postgresRepository.findOne({
            where: {
                id,
            },
        });

        if (!user) {
            throw new AppError(`User do not Exist's`);
        }

        return user;
    }

    public async addMessage(data: ICreateMessageDTO): Promise<Message> {
        const user = await this.findUserById(data.sender)

        const newMessage = this.ormRepository.create({
            conversationId: data.conversationId,
            sender: {
                id: data.sender,
                name: user?.name,
                role: user?.role
            },
            text: data.text,
        });

        const message = await this.save(newMessage);

        return message;
    }

    public async findMessage(conversationId: string): Promise<Message[]> {
        const message = await this.ormRepository.find({
            where: {
                conversationId: conversationId,
            },
        });

        return message;
    }

    public async save(data: Message): Promise<Message> {
        return await this.ormRepository.save(data);
    }
}

export default MessageRepository;
