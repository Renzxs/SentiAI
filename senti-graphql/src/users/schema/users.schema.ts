import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { v4 } from 'uuid';

export type UserDocument = User & Document;

@ObjectType({ description: 'User schema for authentication and profile' })
@Schema({ timestamps: true })
export class User {
  @Field(() => ID)
  @Prop({ required: true, default: v4 })
  id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  phone?: string;

  @Prop({ required: false })
  password?: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  avatar?: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  googleId?: string;

  @Field(() => Boolean, { defaultValue: false })
  @Prop({ default: false })
  isAdmin: boolean;

  @Field(() => Date, { description: 'Created at' })
  createdAt: Date;

  @Field(() => Date, { description: 'Updated at' })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);