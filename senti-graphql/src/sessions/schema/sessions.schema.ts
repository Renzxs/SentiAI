import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { v4 } from 'uuid';

export type SessionDocument = Session & Document;

@ObjectType({ description: 'Session schema for authentication and profile' })
@Schema({ timestamps: true })
export class Session {
    @Field(() => ID)
    @Prop({ required: true, default: v4 })
    id: string;

    @Field()
    @Prop({ required: true })
    userId: string;

    @Field()
    @Prop({ required: true })
    title: string;

    @Field(() => String, { nullable: true })
    @Prop({ required: false })
    description?: string;

    @Field(() => Date, { description: 'Last message at', nullable: true })
    @Prop()
    lastMessageAt: Date;

    @Field(() => Date, { description: 'Created at' })
    createdAt: Date;
  
    @Field(() => Date, { description: 'Updated at' })
    updatedAt: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);