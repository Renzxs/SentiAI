import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument, MessageRole } from './schema/messages.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    ) {}

    async createMessage(
        sessionId: string, 
        userId: string, 
        createMessageDto: CreateMessageDto
    ): Promise<Message> {
        const createdMessage = new this.messageModel({
            ...createMessageDto,
            role: MessageRole.USER,
            sessionId,
            userId,
        });
        return createdMessage.save();
    }
}
