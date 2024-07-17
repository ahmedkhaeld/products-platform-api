import { IsNotEmpty, IsArray, IsNumber } from 'class-validator';

export class CreateUserSubscriptionDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsArray()
  productIds: number[];

  @IsArray()
  bundleIds: number[];
}
