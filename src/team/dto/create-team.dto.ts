import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ example: 'Pasión deportiva' })
  @IsString()
  @IsNotEmpty()
  readonly teamName: string;

  @ApiProperty({ example: 'base64' })
  @IsString()
  @IsNotEmpty()
  logo: string;
}
