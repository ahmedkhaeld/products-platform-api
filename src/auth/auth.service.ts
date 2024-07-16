import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ServiceResponse } from '../common/service-response';
import * as bcryptjs from 'bcryptjs';
import { ITokenPayload, UserTokenPayload } from './payload/token.payload';
import { TokenTypes } from './constants/token-type.constant';
import { UserScopes } from './constants/token-scope.constant';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const response: ServiceResponse = { data: null, error: null };

    const userData = await this.userService.getUserByEmail(email);

    if (userData === null) {
      response.error = 'User not found';
      return response;
    }

    //check the password
    if (userData && userData.password) {
      const isCorrectPassword = bcryptjs.compareSync(
        password,
        userData.password,
      );
      if (isCorrectPassword === false) {
        response.error = 'Password incorrect';
        return response;
      }
    }
    response.data = {
      user: userData,
    };

    return response;
  }

  async loginUser(user: any): Promise<any> {
    const serviceResponse: ServiceResponse = { data: null, error: null };

    const userData = await this.userService.getUserByEmail(user.email);

    const tokenPayload: ITokenPayload = new UserTokenPayload(
      userData.id,
      TokenTypes.UserApp,
      user.email,
      [UserScopes.User],
    );
    const token = this.jwtService.sign(tokenPayload.getTokenPayload());
    serviceResponse.data = {
      user: user,
      access_token: token,
    };

    return serviceResponse;
  }

  async loginAdminUser(user: any): Promise<ServiceResponse> {
    const serviceResponse: ServiceResponse = { data: null, error: null };

    const userData = await this.userService.getUserByEmail(user.email);

    const tokenPayload: ITokenPayload = new UserTokenPayload(
      userData.id,
      TokenTypes.Admin,
      user.email,
      [UserScopes.Admin],
    );

    const token = this.jwtService.sign(tokenPayload.getTokenPayload());
    serviceResponse.data = {
      user: user,
      access_token: token,
    };

    return serviceResponse;
  }
}
