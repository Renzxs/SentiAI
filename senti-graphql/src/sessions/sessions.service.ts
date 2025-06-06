import { Injectable } from '@nestjs/common';
import { Session, SessionDocument } from './schema/sessions.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionsService {
    constructor(
        @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
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

    async findSessionById(id: string): Promise<Session | null> {
        const session = await this.sessionModel.findOne({ id });
        return session;
    }

    async deleteSession(id: string): Promise<Session | null> {
        const session = await this.sessionModel.findOneAndDelete({ id });
        return session;
    }
}

