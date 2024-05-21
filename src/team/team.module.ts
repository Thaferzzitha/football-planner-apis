import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { Team, TeamSchema } from './models/team.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Team.name,
        schema: TeamSchema,
      },
    ]),
  ],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
