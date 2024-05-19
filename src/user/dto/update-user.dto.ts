import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'John', required: false })
  @IsString()
  readonly firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsString()
  readonly lastName?: string;

  @ApiProperty({ example: 'john@mail.com', required: false })
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '123456', required: false })
  @IsString()
  password?: string;
}
