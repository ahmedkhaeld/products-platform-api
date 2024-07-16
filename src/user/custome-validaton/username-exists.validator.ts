import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { UserService } from '../user.service';

@ValidatorConstraint({ name: 'IsUsernameExist', async: true })
@Injectable()
export class IsUsernameExistValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  public async validate(value: string) {
    if (value == null) return false;

    const userDoc = await this.userService.getUserByUsername(value);
    return !userDoc;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public defaultMessage(validationArguments?: ValidationArguments): string {
    return JSON.stringify({
      en: 'user name already exists',
      ar: 'user name already exists',
    });
  }
}

export function IsUsernameExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUsernameExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsUsernameExistValidator,
    });
  };
}
