import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSubscription } from '../entities/user-subscription.entity';
import { CreateUserSubscriptionDto } from '../dto/create-user-subscription.dto';
import { BundleService } from '../../products/service/bundle.service';
import { ProductsService } from '../../products/service/products.service';
import { UserService } from './user.service';

@Injectable()
export class UserSubscriptionService {
  constructor(
    @InjectRepository(UserSubscription)
    private readonly userSubscriptionRepository: Repository<UserSubscription>,
    private readonly userService: UserService,
    private readonly productService: ProductsService,
    private readonly bundleService: BundleService,
  ) {}

  async createUserSubscription(
    createUserSubscriptionDto: CreateUserSubscriptionDto,
  ) {
    const { userId, productIds, bundleIds } = createUserSubscriptionDto;

    // Validate user
    const user = await this.userService.getUser(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Validate products
    const products = await this.productService.findByIds(productIds);
    if (products.length !== productIds.length) {
      throw new NotFoundException('One or more products not found');
    }

    // Validate bundles
    const bundles = await this.bundleService.findByIds(bundleIds);
    if (bundles.length !== bundleIds.length) {
      throw new NotFoundException('One or more bundles not found');
    }

    const userSubscription = this.userSubscriptionRepository.create({
      user,
      products,
      bundles,
    });

    return this.userSubscriptionRepository.save(userSubscription);
  }

  async findAllUserSubscriptions() {
    return this.userSubscriptionRepository.find({
      relations: ['user', 'products', 'bundles'],
    });
  }

  async getUserSubscription(id: number) {
    const userSubscription = await this.userSubscriptionRepository.findOne({
      where: { id },
      relations: ['user', 'products', 'bundles'],
    });

    if (!userSubscription) {
      throw new NotFoundException('User subscription not found');
    }

    return userSubscription;
  }

  async removeUserSubscription(id: number) {
    const result = await this.userSubscriptionRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('User subscription not found');
    }
  }





  async getUserProducts(id: number) {
    const userSubscription = await this.userSubscriptionRepository.findOne({
      where: { id },
      relations: ['user', 'products'],
    });

    if (!userSubscription) {
      throw new NotFoundException('User subscription not found');
    }

    return userSubscription;
  }

  async getUserBundles(id: number) {
    const userSubscription = await this.userSubscriptionRepository.findOne({
      where: { id },
      relations: ['user', 'bundles'],
    });

    if (!userSubscription) {
      throw new NotFoundException('User subscription not found');
    }

    return userSubscription;
  }

}
