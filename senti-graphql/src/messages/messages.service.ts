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

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

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

    async handleAgentResponse(content: string, model: string): Promise<string> {
        const instruction = await this.getInstruction();
        switch(model) {
            case 'gemini':
                try {
                    const gemini = `https://generativelanguage.googleapis.com/v1beta/models/${this.configService.get<string>('ai.geminiModel')}:generateContent?key=${this.configService.get<string>('ai.geminiApiKey')}`;
                    const geminiResponse = await lastValueFrom(
                        this.httpService.post(gemini, {
                            contents: [{
                                parts: [{
                                    text: content
                                }]
                            }],
                            systemInstruction: {
                                parts: [{
                                    text: instruction
                                }]
                            }
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                    )
                    return geminiResponse.data.candidates[0].content.parts[0].text;
                } catch (error) {
                    throw new Error(`Error in Gemini API ${error}`);
                }
            case 'chatgpt':
                try {
                    const gpt = `https://models.github.ai/inference/chat/completions`;
                    const gptResponse = await lastValueFrom(
                        this.httpService.post(gpt, {
                            model: this.configService.get<string>('ai.ghOpenAiModel'),
                            temperature: 1,
                            top_p: 1,
                            messages: [
                                {
                                    "role": "developer",
                                    "content": instruction
                                },
                                { 
                                    role: 'user', 
                                    content: content 
                                },
                            ],
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${this.configService.get<string>('ai.ghOpenAiApiKey')}`
                            },  
                        })
                    )  
                    return gptResponse.data.choices[0].message.content;
                } catch (error) {
                    throw new Error(`Error in ChatGPT API ${error}`);
                }
            case 'deepseek':
                try {
                    const deepseek = `https://router.huggingface.co/fireworks-ai/inference/v1/chat/completions`;
                    const deepseekResponse = await lastValueFrom(
                        this.httpService.post(deepseek, {
                            model: this.configService.get<string>('ai.deepseekModel'),
                            stream: false,
                            messages: [
                                {
                                    "role": "system", 
                                    "content": instruction
                                },
                                {
                                    "role": "user", 
                                    "content": content
                                }
                            ],
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${this.configService.get<string>('ai.hfApiKey')}`
                            },  
                        })
                    )
                    console.log(deepseekResponse.data);
                    return deepseekResponse.data.choices[0].message.content;
                }
                catch (error) {
                    throw new Error(`Error in DeepSeek API ${error}`);
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
