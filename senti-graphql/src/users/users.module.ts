import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.schema';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { UsersController } from './users.controller';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('auth.jwtSecret'),
                signOptions: { expiresIn: '1000d' },
            }),
        }),
        MongooseModule.forFeature([{ 
            name: User.name, 
            schema: UserSchema 
        }]),
        HttpModule.register({
            timeout: 20000,
        })
    ],
    providers: [UsersService, UsersResolver],
    exports: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
