import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument, MessageRole } from './schema/messages.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { readFile } from 'fs';
import { join } from 'path';
import OpenAI from 'openai';

@Injectable()
export class MessagesService {
    private client: OpenAI;

    constructor(
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.client = new OpenAI({
            apiKey: this.configService.get<string>('ai.ghOpenAiApiKey'),
            baseURL: "https://models.github.ai/inference",
        });
    }

    async createMessage(
        userId: string, 
        createMessageDto: CreateMessageDto
    ): Promise<Message> {
        const createdMessage = new this.messageModel({
            ...createMessageDto,
            role: MessageRole.USER,
            sessionId: createMessageDto.sessionId,
            userId,
        });
        await createdMessage.save();

        const agentResponse = await this.handleAgentResponse(createMessageDto.content, createMessageDto.model);
        const message = new this.messageModel({
            role: MessageRole.SYSTEM,
            sessionId: createMessageDto.sessionId,
            userId,
            content: agentResponse,
            model: createMessageDto.model,
        });
        return message.save();
    }

    async getMessages(userId: string, sessionId: string): Promise<Message[] | null> {
        const messages = await this.messageModel.find({ userId, sessionId });
        return messages;
    }

    async handleAgentResponse(content: string, model: string): Promise<string | null> {
        const instruction = await this.getInstruction();
        switch(model) {
            case 'chatgpt':
                try {
                    const response = await this.client.chat.completions.create({
                        messages: [
                            { role:"system", "content": instruction },
                            { role:"user", content: content }
                        ],
                        model: 'openai/gpt-4.1',
                        temperature: 1,
                        top_p: 1,
                    });

                    return response.choices[0].message.content;
                } catch (error) {
                    throw new Error(`Error in ChatGPT API ${error}`);
                }
            default:
                throw new Error('Invalid model');
        }
    }

    async getInstruction(): Promise<string> {
        const filePath = join(process.cwd(), 'src/messages/senti-instructions.md');
        return new Promise((resolve, reject) => {
            readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}
