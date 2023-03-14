import {
    Entity,
    Column,
    ObjectIdColumn,
    ObjectID,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';

@Entity('conversation')
export class Conversation {
    @ObjectIdColumn()
    _id: string;

    @Column({ type: 'array', default: [] })
    members: {
        send: {
            id: string;
            name: string;
            role: string;
        };
        receive: {
            id: string;
            name: string;
            role: string;
        };
    }[];

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

export default Conversation;
