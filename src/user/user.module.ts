import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsUserIdExistValidator } from './custome-validaton/user-id-exists.validator';
import { IsUserEmailExistValidator } from './custome-validaton/email-exists.validator';
import { IsUsernameExistValidator } from './custome-validaton/username-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    IsUserIdExistValidator,
    IsUserEmailExistValidator,
    IsUsernameExistValidator,
  ],
})
export class UserModule {}
