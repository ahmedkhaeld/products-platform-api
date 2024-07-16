import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { UserService } from '../user.service';

@ValidatorConstraint({ name: 'IsUserIdExist', async: true })
@Injectable()
export class IsUserIdExistValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  public async validate(value: string) {
    if (value == null) return false;

    const userDoc = await this.userService.getUser(value);
    return userDoc != null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public defaultMessage(validationArguments?: ValidationArguments): string {
    return JSON.stringify({
      en: 'user already exists',
      ar: 'user already exists',
    });
  }
}

export function IsUserIdExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUserIdExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsUserIdExistValidator,
    });
  };
}
