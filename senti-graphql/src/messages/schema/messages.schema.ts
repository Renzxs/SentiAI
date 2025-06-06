import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { v4 } from 'uuid';

export type MessageDocument = Message & Document;

export enum MessageRole {
    USER = 'user',
    SYSTEM = 'system',
    ASSISTANT = 'assistant',
}

registerEnumType(MessageRole, {
  name: 'MessageRole',
  description: 'Role of the message sender',
});
  
@ObjectType({ description: 'Chat message schema' })
@Schema({ timestamps: true })
export class Message {
    @Field(() => ID)
    @Prop({ required: true, default: v4 })
    id: string;

    @Field(() => MessageRole)
    @Prop({ default: MessageRole.USER })
    role: MessageRole;

    @Field(() => String, { nullable: true })
    @Prop({ required: false, type: String })
    content: string;

    @Field(() => Boolean, {
        description: 'Whether message is liked',
        defaultValue: false,
    })
    @Prop({ default: false })
    isLiked: boolean;

    @Field(() => ID)
    @Prop({ required: true })
    sessionId: string;

    @Field(() => String)
    @Prop({ required: true })
    model: string;

    @Field(() => ID)
    @Prop({ required: true })
    userId: string;

    @Field(() => Date, { description: 'Created at' })
    createdAt: Date;
  
    @Field(() => Date, { description: 'Updated at' })
    updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);