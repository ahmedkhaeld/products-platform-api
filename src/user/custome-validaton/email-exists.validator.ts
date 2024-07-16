import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { UserService } from '../user.service';

@ValidatorConstraint({ name: 'IsUserEmailExist', async: true })
@Injectable()
export class IsUserEmailExistValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  public async validate(value: string) {
    if (value == null) return false;

    const userDoc = await this.userService.getUserByEmail(value);
    return !userDoc;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public defaultMessage(validationArguments?: ValidationArguments): string {
    return JSON.stringify({
      en: 'user email already exists',
      ar: 'user email already exists',
    });
  }
}

export function IsUserEmailExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUserEmailExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsUserEmailExistValidator,
    });
  };
}
