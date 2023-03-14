import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    ObjectID,
    ObjectIdColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('messages')
class Message {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    conversationId: string;

    @Column()
    sender: {
        id: string;
        name: string;
        role: string;
    };

    @Column()
    text: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: 'int', default: null })
    __v: number;

    @BeforeInsert()
    @BeforeUpdate()
    incrementVersion() {
        if (!this.__v) this.__v = 0;
        else this.__v++;
    }
}

export default Message;
