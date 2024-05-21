import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/models/user.model';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Team, TeamSchema } from './team/models/team.model';
import { TeamController } from './team/team.controller';
import { TeamService } from './team/team.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(
          'MONGO_DB_CONNECTION',
          'mongodb://root:root@localhost:27017/nest?authSource=admin',
        ),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
  ],
  controllers: [AppController, UserController, TeamController],
  providers: [AppService, UserService, TeamService],
})
export class AppModule {}
