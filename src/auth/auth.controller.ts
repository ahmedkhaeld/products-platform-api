import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.guard';
import { SuccessResponse } from '../common/http-responses/success.response';

import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login-admin')
  @ApiResponse({
    status: 200,
    description: 'Admin login successful',
  })
  async registerAdmin(@Request() req: any) {
    const user = req.user;
    const response = await this.authService.loginAdminUser(user);
    return new SuccessResponse(response.data);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiResponse({
    status: 200,
    description: 'User login successful',
  })
  async login(@Request() req: any) {
    const user = req.user;
    const response = await this.authService.loginUser(user);
    return new SuccessResponse(response.data);
  }
}
