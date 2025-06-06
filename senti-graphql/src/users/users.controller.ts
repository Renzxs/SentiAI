import { Controller, Get, HttpCode, Query, Redirect } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('sentiai')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('github/callback')
    @HttpCode(302)
    @Redirect()
    async handleGithubAuthCallback(@Query('code') code: string): Promise<{ url: string }> {
        return this.usersService.handleGithubAuthCallback(code);
    }
}
