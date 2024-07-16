import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { IsUsernameExist } from '../custome-validaton/username-exists.validator';
import { IsUserEmailExist } from '../custome-validaton/email-exists.validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  middleName: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsUsernameExist()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUserEmailExist()
  email: string;

  @IsString()
  @IsEnum(['f', 'm', 'u'])
  gender: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  dob: string;
}
