import { Injectable } from '@nestjs/common';
import { Session, SessionDocument } from './schema/sessions.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSessionDto } from './dto/create-session.dto';
import { Message } from '../messages/schema/messages.schema';

@Injectable()
export class SessionsService {
    constructor(
        @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
        @InjectModel(Message.name) private messageModel: Model<Message>,
    ) {}

    async createSession(userId: string, createSessionDto: CreateSessionDto): Promise<SessionDocument> {
        const createdSession = new this.sessionModel({
            userId,
            ...createSessionDto,
            lastMessageAt: new Date(),
        });
        return createdSession.save();
    }

    async findAllSessions(userId: string): Promise<Session[] | null> {
        const sessions = await this.sessionModel.find({ userId });
        return sessions;
    }

    async findSessionById(userId: string, id: string): Promise<Session | null> {
        const session = await this.sessionModel.findOne({ id, userId });
        return session;
    }

    async deleteSession(userId: string, id: string): Promise<boolean> {
        // Delete all messages associated with this session
        await this.messageModel.deleteMany({ sessionId: id, userId });
        // Delete the session
        const session = await this.sessionModel.findOneAndDelete({ id, userId });
        return !!session;
    }
}

