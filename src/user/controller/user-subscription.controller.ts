import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserSubscriptionService } from '../service/user-subscription.service';
import { CreateUserSubscriptionDto } from '../dto/create-user-subscription.dto';
import { UserSubscription } from '../entities/user-subscription.entity';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { JwtUserAuthGuard } from '../../auth/guard/jwt-user.guard';
import { Public } from '../../auth/decorator/public.decorator';

@ApiTags('UserSubscription')
@Controller('user-subscriptions')
export class UserSubscriptionController {
  constructor(
    private readonly userSubscriptionService: UserSubscriptionService,
  ) {}

  @UseGuards(JwtUserAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create user subscription' })
  @ApiResponse({ status: 201, description: 'User subscription created' })
  @ApiResponse({
    status: 404,
    description: 'User, Product, or Bundle not found',
  })
  createUserSubscription(
    @Body() createUserSubscriptionDto: CreateUserSubscriptionDto,
  ) {
    return this.userSubscriptionService.createUserSubscription(
      createUserSubscriptionDto,
    );
  }

  @UseGuards(JwtUserAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all user subscriptions' })
  @ApiResponse({ status: 200, description: 'List of user subscriptions' })
  findAllUserSubscriptions(): Promise<UserSubscription[]> {
    return this.userSubscriptionService.findAllUserSubscriptions();
  }

  @UseGuards(JwtUserAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user subscription by ID' })
  @ApiResponse({ status: 200, description: 'User subscription found' })
  @ApiResponse({ status: 404, description: 'User subscription not found' })
  getUserSubscription(@Param('id') id: number) {
    return this.userSubscriptionService.getUserSubscription(id);
  }

  @UseGuards(JwtUserAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user subscription by ID' })
  @ApiResponse({ status: 204, description: 'User subscription deleted' })
  @ApiResponse({ status: 404, description: 'User subscription not found' })
  removeUserSubscription(@Param('id') id: number) {
    return this.userSubscriptionService.removeUserSubscription(id);
  }

  @UseGuards(JwtUserAuthGuard)
  @Get('products')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get user products successfully.' })
  @ApiResponse({ status: 404, description: 'User has no subscriptions.' })
  async getUserProducts(@Request() req: any) {
    const userId = req.user.id;
    return this.userSubscriptionService.getUserProducts(userId);
  }

  @UseGuards(JwtUserAuthGuard)
  @Get('bundles')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get user bundles successfully.' })
  @ApiResponse({ status: 404, description: 'User has no subscriptions.' })
  async getUserBundles(@Request() req: any) {
    const userId = req.user.id;
    return this.userSubscriptionService.getUserBundles(userId);
  }
}
