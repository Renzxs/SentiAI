import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SessionsService } from './sessions.service';
import { Session } from './schema/sessions.schema';
import { CreateSessionDto } from './dto/create-session.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/users/guard/auth.guard';

@UseGuards(AuthGuard)
@Resolver(() => Session)
export class SessionsResolver {
    constructor(
        private readonly sessionsService: SessionsService
    ) {}

    @Mutation(() => Session)
    async createSession(
        @Context() context: any, 
        @Args('createSessionDto') createSessionDto: CreateSessionDto
    ): Promise<Session> {
        return this.sessionsService.createSession(context.req.user.id, createSessionDto);
    }

    @Query(() => [Session])
    async sessions(@Context() context: any): Promise<Session[] | null> {
        return this.sessionsService.findAllSessions(context.req.user.id);
    }

    @Query(() => Session)
    async session(@Args('id') id: string): Promise<Session | null> {
        return this.sessionsService.findSessionById(id);
    }
}
