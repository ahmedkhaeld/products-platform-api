import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ServiceResponse } from '../../common/service-response';
import { ListProductsDto } from '../dto/list-products.dot';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly userService: UserService,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ServiceResponse> {
    const serviceResponse: ServiceResponse = { data: null, error: null };

    // Fetch the creator (User) by ID
    const creator = await this.userService.getUser(createProductDto.creatorId);

    if (!creator) {
      serviceResponse.error = 'Creator not found';
      return serviceResponse;
    }

    // Create and save the new product
    const product = new Product();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.creator = creator;
    const newProduct = await this.productRepository.save(product);

    serviceResponse.data = {
      product: newProduct,
    };
    return serviceResponse;
  }

  async listAllProducts(
    query: ListProductsDto,
  ): Promise<{ data: Product[]; total: number }> {
    const { search, page = 1, limit = 25 } = query;

    const skip = (page - 1) * limit;

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.creator', 'creator')
      .leftJoinAndSelect('product.bundles', 'bundle')
      .orderBy('product.creationDate', 'DESC')
      .skip(skip)
      .take(limit);

    if (search) {
      queryBuilder.andWhere(
        'product.name LIKE :search OR creator.username LIKE :search OR creator.email LIKE :search',
        { search: `%${search}%` },
      );
    }

    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total };
  }

  async getProduct(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['creator', 'bundles'],
    });
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ServiceResponse> {
    const serviceResponse: ServiceResponse = { data: null, error: null };

    // Fetch the product by ID
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['creator'],
    });

    if (!product) {
      serviceResponse.error = 'Product not found';
      return serviceResponse;
    }

    // If a new creatorId is provided, fetch the new creator
    if (updateProductDto.creatorId) {
      const newCreator = await this.userService.getUser(
        updateProductDto.creatorId,
      );

      if (!newCreator) {
        serviceResponse.error = 'New creator not found';
        return serviceResponse;
      }

      product.creator = newCreator;
    }

    // Update the product fields
    if (updateProductDto.name !== undefined) {
      product.name = updateProductDto.name;
    }

    if (updateProductDto.description !== undefined) {
      product.description = updateProductDto.description;
    }

    const updatedProduct = await this.productRepository.save(product);

    serviceResponse.data = {
      product: updatedProduct,
    };
    return serviceResponse;
  }

  async removeProduct(id: number): Promise<{ affected?: number }> {
    return this.productRepository.delete(id);
  }

  async findByIds(ids: number[]): Promise<Product[]> {
    return this.productRepository.find({
      where: { id: In(ids) },
    });
  }
}
