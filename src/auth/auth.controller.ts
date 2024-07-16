import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.guard';
import { SuccessResponse } from '../common/http-responses/success.response';
import { Public } from './decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login-admin')
  async registerAdmin(@Request() req: any) {
    const user = req.user;

    const response = await this.authService.loginAdminUser(user);

    return new SuccessResponse(response.data);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any) {
    const user = req.user;

    const response = await this.authService.loginUser(user);

    return new SuccessResponse(response.data);
  }
}
