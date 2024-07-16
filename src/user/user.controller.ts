import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserParamDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { SuccessCreatedResponse } from '../common/http-responses/success-created.response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const response = await this.userService.createUser(createUserDto);

    return new SuccessCreatedResponse(response.data);
  }

  @Get()
  findAll() {
    return this.userService.findAllUser();
  }

  @Get(':id')
  findOne(@Param() param: GetUserDto) {
    return this.userService.getUser(param.id);
  }

  @Patch(':id')
  update(
    @Param() param: UpdateUserParamDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(param.id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() param: DeleteUserDto) {
    return this.userService.removeUser(param.id);
  }
}
