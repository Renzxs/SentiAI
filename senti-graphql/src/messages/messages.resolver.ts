import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './schema/messages.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/users/guard/auth.guard';

@UseGuards(AuthGuard)
@Resolver(() => Message)
export class MessagesResolver {
    constructor(
        private readonly messagesService: MessagesService
    ) {}

    @Mutation(() => Message)
    async createMessage(
        @Context() context: any,
        @Args('createMessageDto') createMessageDto: CreateMessageDto
    ): Promise<Message> {
        return this.messagesService.createMessage(context.req.user.id, createMessageDto);
    }

    @Query(() => [Message], { nullable: true })
    async getMessages(
        @Context() context: any,
        @Args('sessionId') sessionId: string
    ): Promise<Message[] | null> {
        return this.messagesService.getMessages(context.req.user.id, sessionId);
    }
}
