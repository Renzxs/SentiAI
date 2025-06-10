import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsResolver } from './sessions.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from './schema/sessions.schema';
import { Message, MessageSchema } from 'src/messages/schema/messages.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ 
      name: Session.name, 
      schema: SessionSchema 
    }]),
    MongooseModule.forFeature([{ 
      name: Message.name, 
      schema: MessageSchema 
    }]),
  ],
  providers: [SessionsService, SessionsResolver]
})
export class SessionsModule {}
