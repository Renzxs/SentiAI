import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsResolver } from './sessions.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from './schema/sessions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ 
      name: Session.name, 
      schema: SessionSchema 
    }]),
  ],
  providers: [SessionsService, SessionsResolver]
})
export class SessionsModule {}
