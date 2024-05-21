import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team, TeamDocument } from './models/team.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<TeamDocument>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const createdTeam = await this.teamModel.create(createTeamDto);
    return createdTeam;
  }

  async findAll() {
    const teams = await this.teamModel.find().exec();
    return teams;
  }

  async findOne(id: string) {
    const team = await this.teamModel.findById(id);
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    const _id = new Types.ObjectId(id);
    const existingTeam = await this.teamModel.findOne({ _id: id }).exec();
    if (!existingTeam) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    const updatedTeam = await this.teamModel
      .findByIdAndUpdate(_id, updateTeamDto, {
        new: true,
      })
      .exec();

    return updatedTeam;
  }

  async remove(id: string) {
    const deletedTeam = await this.teamModel.findByIdAndDelete(id);
    if (!deletedTeam) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return deletedTeam;
  }
}
