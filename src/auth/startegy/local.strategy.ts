import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Exceptions } from '../../common/errors/exceptions';
import { UserScopes } from '../constants/token-scope.constant';
import { InvalidParamsException } from '../../common/exception/invalid-params-exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
  ) {
    //super take in other strategy configuration options
    super({ passReqToCallback: true });

  }

  async validate(
    request: Request,
    username: string,
    password: string,
  ): Promise<any> {
    if (!request.body || !request.body['scope']) {
      const invalidParams = Exceptions.INVALID_PARAMS;
      invalidParams.fields =
        '(scope) body param must be one of [' +
        UserScopes.User +
        ' , ' +
        UserScopes.Admin +
        ']';
      throw new InvalidParamsException(invalidParams);
    }

    const response = await this.authService.validateUser(username, password);

    if (response.error) {
      console.error(response.error);
      throw new UnauthorizedException(response.error);
    }

    return response.data.user;
  }
}
