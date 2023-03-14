import ICreateConversationDTO from '@modules/chat/dtos/ICreateConversationDTO';
import ITwoConversationDTO from '@modules/chat/dtos/ITwoConversatiosDTO';
import Conversation from '@modules/chat/infra/typeorm/schemas/Conversation';
import IConversationRepository from '@modules/chat/repositories/IConversationRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { MongoDataSource, PostgresDataSource } from '@shared/infra/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { uuid } from 'uuidv4';

class ConversationsRepository implements IConversationRepository {
    private ormRepository: Repository<Conversation>;
    private postgresRepository: Repository<User>;

    constructor() {
        this.ormRepository = MongoDataSource.getMongoRepository(Conversation);
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

    public async createConversation(
        data: ICreateConversationDTO,
    ): Promise<Conversation> {
        const userOne = await this.findUserById(data.senderId);
        const userTwo = await this.findUserById(data.receiverId);

        const newConversation = this.ormRepository.create({
            _id: uuid(),
            members: [
                {
                    send: {
                        id: data.senderId,
                        name: userOne?.name,
                        //`https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${userOne?.avatar}`
                        role: userOne?.role,
                    },
                    receive: {
                        id: data.receiverId,
                        //`https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${userTwo?.avatar}
                        role: userTwo?.role,
                        name: userTwo?.name,
                    },
                },
            ],
        });

        await this.ormRepository.save(newConversation);

        return newConversation;
    }

    public async findConversation(
        user_id: string,
    ): Promise<Conversation[] | undefined> {
        const conversations = await this.ormRepository.find({
            where: {
                members: {
                    $elemMatch: {
                        $or: [
                            { 'send.id': user_id },
                            { 'receive.id': user_id },
                        ],
                    },
                },
            } as FindOptionsWhere<Conversation>,
        });
        return conversations;
    }

    public async findTwoConversation(
        data: ITwoConversationDTO,
    ): Promise<Conversation | null> {
        const conversation = await this.ormRepository.findOne({
            where: {
                members: {
                    send: {
                        id: data.firstUserId,
                    },
                    receive: {
                        id: data.secondUserId,
                    },
                },
            },
        });

        return conversation;
    }

    public async save(data: Conversation): Promise<Conversation> {
        const newConversation = await this.ormRepository.save(data);

        return newConversation;
    }
}

export default ConversationsRepository;
