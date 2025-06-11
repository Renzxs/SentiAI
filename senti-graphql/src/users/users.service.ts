import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {}

    async getGithubAuthUrl(): Promise<string> {
        const url = `https://github.com/login/oauth/authorize?client_id=${this.configService.get<string>('github.clientId')}&scope=${this.configService.get<string>('github.scope')}&redirect_uri=${this.configService.get<string>('github.redirectUri')}`;
        return url;
    }

    async handleGithubAuthCallback(code: string): Promise<{ url: string }> { 
        if(!code) {
            return { url: `http://localhost:3000/` };
        }

        try {
            const tokenResponse = await lastValueFrom(
                this.httpService.get("https://github.com/login/oauth/access_token", {
                    params: {
                        client_id: this.configService.get<string>('github.clientId'),
                        client_secret: this.configService.get<string>('github.clientSecret'),
                        code: code,
                    },
                    headers: {
                        "Accept": "application/json",
                        "Accept-Encoding": "application/json",
                    }
                })
            );

            const userResponse =  await lastValueFrom(
                this.httpService.get("https://api.github.com/user", {
                    headers: {
                        "Authorization": `Bearer ${tokenResponse.data.access_token}`
                    }
                })
            );

            const emailReponse = await lastValueFrom(
                this.httpService.get('https://api.github.com/user/emails', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.data.access_token}`,
                    },
                })
            );

            const githubUser = userResponse.data;
            let user = await this.findByEmail(emailReponse.data[0].email);
            if(!user) {
                user = await this.createUser({
                    name: githubUser.name,
                    email: emailReponse.data[0].email,
                    avatar: githubUser.avatar_url,
                });
            }

            const payload = { id: user.id, email: user.email };
            const accessToken = this.jwtService.sign(payload);

            return { url: `http://localhost:3000/auth?token=${accessToken}` };
        }
        catch(error) {
            throw new Error(error.message);
        }
    }
    
    async createUser(createUserInput: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserInput);
        return createdUser.save();
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({ email });
        return user;
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.userModel.findOne({ id });
        return user;
    }

    async deleteUser(id: string): Promise<User> {
        const user = await this.userModel.findByIdAndDelete(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
}
