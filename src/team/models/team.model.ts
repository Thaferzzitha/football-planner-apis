import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TeamDocument = HydratedDocument<Team>;

@Schema({ timestamps: true })
export class Team {
  @Prop({ type: String, unique: true, required: true })
  teamName: string;

  @Prop({ type: String, required: false, default: '' })
  logo: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
