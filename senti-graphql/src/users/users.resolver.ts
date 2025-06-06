import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './schema/users.schema';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';

@Resolver()
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => String)
    async getGithubAuthUrl(): Promise<string> {
        return this.usersService.getGithubAuthUrl();
    }

    @UseGuards(AuthGuard)
    @Query(() => User, { nullable: true })
    async getUser(@Context() context: any): Promise<User | null> {
        return this.usersService.findById(context.req.user.id);
    }
}
