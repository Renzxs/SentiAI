import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schema/messages.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ 
      name: Message.name, 
      schema: MessageSchema 
    }]),
    HttpModule.register({
      timeout: 20000,
    })
  ],
  providers: [MessagesService, MessagesResolver]
})
export class MessagesModule {}
