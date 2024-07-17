import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './service/products.service';
import { ProductsController } from './controller/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Bundle } from './entities/bundle.entity';
import { UserModule } from '../user/user.module';
import { ProductsBundleController } from './controller/bundle.controller';
import { BundleService } from './service/bundle.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Bundle]),
    forwardRef(() => UserModule),
  ],

  controllers: [ProductsController, ProductsBundleController],
  providers: [ProductsService, BundleService],
  exports: [ProductsService, BundleService],
})
export class ProductsModule {}
