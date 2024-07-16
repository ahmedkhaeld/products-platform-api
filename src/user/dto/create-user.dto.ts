import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsUsernameExist } from '../custome-validaton/username-exists.validator';
import { IsUserEmailExist } from '../custome-validaton/email-exists.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsUsernameExist()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUserEmailExist()
  email: string;

  @IsNotEmpty()
  password: string;
}
