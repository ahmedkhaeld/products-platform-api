import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsUserIdExistValidator } from './custome-validaton/user-id-exists.validator';
import { IsUserEmailExistValidator } from './custome-validaton/email-exists.validator';
import { IsUsernameExistValidator } from './custome-validaton/username-exists.validator';
import { UserSubscription } from './entities/user-subscription.entity';
import { UserSubscriptionService } from './service/user-subscription.service';
import { UserSubscriptionController } from './controller/user-subscription.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserSubscription]),
    forwardRef(() => ProductsModule),
  ],
  controllers: [UserController, UserSubscriptionController],
  providers: [
    UserService,
    IsUserIdExistValidator,
    IsUserEmailExistValidator,
    IsUsernameExistValidator,
    UserSubscriptionService,
  ],
  exports: [UserService, UserSubscriptionService],
})
export class UserModule {}
