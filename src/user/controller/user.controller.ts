import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto, UpdateUserParamDto } from '../dto/update-user.dto';
import { GetUserDto } from '../dto/get-user.dto';
import { DeleteUserDto } from '../dto/delete-user.dto';
import { SuccessCreatedResponse } from '../../common/http-responses/success-created.response';
import { Public } from '../../auth/decorator/public.decorator';
import { JwtAdminAuthGuard } from '../../auth/guard/jwt-admin.guard';
import { JwtUserAuthGuard } from '../../auth/guard/jwt-user.guard';

import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const response = await this.userService.createUser(createUserDto);
    return new SuccessCreatedResponse(response.data);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'List of all users',
  })
  findAll() {
    return this.userService.findAllUser();
  }

  @UseGuards(JwtUserAuthGuard)
  @Get('/profile')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
  })
  getUserProfile(@Request() req: any) {
    const user = req.user;
    return this.userService.getUser(user.id);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User details retrieved successfully',
  })
  findOne(@Param() param: GetUserDto) {
    return this.userService.getUser(param.id);
  }

  @UseGuards(JwtUserAuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User details updated successfully',
  })
  update(
    @Param() param: UpdateUserParamDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(param.id, updateUserDto);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
  })
  remove(@Param() param: DeleteUserDto) {
    return this.userService.removeUser(param.id);
  }
}
