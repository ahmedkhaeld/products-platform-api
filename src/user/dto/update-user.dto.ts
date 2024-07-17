import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';
import { IsUserIdExist } from '../custome-validaton/user-id-exists.validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserParamDto {
  @IsNotEmpty()
  @IsUserIdExist()
  id: number;
}
