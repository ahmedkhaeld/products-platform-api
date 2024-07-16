import { IsNotEmpty } from 'class-validator';
import { IsUserIdExist } from '../custome-validaton/user-id-exists.validator';

export class GetUserDto {
  @IsNotEmpty()
  @IsUserIdExist()
  id: string;
}
