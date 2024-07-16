import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards, Request
} from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserParamDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { SuccessCreatedResponse } from '../common/http-responses/success-created.response';
import { Public } from '../auth/decorator/public.decorator';
import { JwtAdminAuthGuard } from '../auth/guard/jwt-admin.guard';
import { JwtUserAuthGuard } from "../auth/guard/jwt-user.guard";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const response = await this.userService.createUser(createUserDto);

    return new SuccessCreatedResponse(response.data);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAllUser();
  }


  @UseGuards(JwtUserAuthGuard)
  @Get('/profile')
  getUserProfile(@Request() req: any) {
    const user = req.user;
    console.log(user);
    return this.userService.getUser(user.id);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Get(':id')
  findOne(@Param() param: GetUserDto) {
    return this.userService.getUser(param.id);
  }


  @UseGuards(JwtUserAuthGuard)
  @Patch(':id')
  update(
    @Param() param: UpdateUserParamDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(param.id, updateUserDto);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Delete(':id')
  remove(@Param() param: DeleteUserDto) {
    return this.userService.removeUser(param.id);
  }
}
