import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('app')
@Controller('')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Hello World',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
