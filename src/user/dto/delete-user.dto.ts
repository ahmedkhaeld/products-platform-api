import { IsNotEmpty } from 'class-validator';
import { IsUserIdExist } from '../custome-validaton/user-id-exists.validator';

export class DeleteUserDto {
  @IsNotEmpty()
  @IsUserIdExist()
  id: string;
}
