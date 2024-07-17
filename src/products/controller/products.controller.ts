import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListProductsDto } from '../dto/list-products.dot';
import { JwtAdminAuthGuard } from '../../auth/guard/jwt-admin.guard';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAdminAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }
  @UseGuards(JwtAdminAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'List of all products',
  })
  async listProducts(
    @Query() query: ListProductsDto,
  ): Promise<{ data: Product[]; total: number }> {
    return this.productsService.listAllProducts(query);
  }
  @UseGuards(JwtAdminAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Product details retrieved successfully',
  })
  findOne(@Param('id') id: string) {
    return this.productsService.getProduct(+id);
  }
  @UseGuards(JwtAdminAuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Product details updated successfully',
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(+id, updateProductDto);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully',
  })
  remove(@Param('id') id: string) {
    return this.productsService.removeProduct(+id);
  }
}
