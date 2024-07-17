import { Injectable } from '@nestjs/common';
import { In, Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { Bundle } from '../entities/bundle.entity';
import { CreateBundleDto } from '../dto/create-bundle.dto';
import { UpdateBundleDto } from '../dto/update-bundle.dto';
import { ServiceResponse } from '../../common/service-response';
import { ListBundlesDto } from '../dto/list-bundles.dto';
import { Product } from '../entities/product.entity';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class BundleService {
  constructor(
    @InjectRepository(Bundle)
    private readonly bundleRepository: Repository<Bundle>,
    private readonly userService: UserService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createBundle(
    createBundleDto: CreateBundleDto,
  ): Promise<ServiceResponse> {
    const serviceResponse: ServiceResponse = { data: null, error: null };

    // Validate creator
    const creator = await this.userService.getUser(createBundleDto.creatorId);
    if (!creator) {
      serviceResponse.error = 'Creator not found';
      return serviceResponse;
    }

    // Validate products
    const products = await this.productRepository.findByIds(
      createBundleDto.productIds || [],
    );
    if (products.some((product) => product.isBundle)) {
      serviceResponse.error = 'Cannot add bundles to a new bundle';
      return serviceResponse;
    }

    // Create bundle entity
    const bundle = new Bundle();
    bundle.name = createBundleDto.name;
    bundle.description = createBundleDto.description;
    bundle.creator = creator;
    bundle.products = products;

    // Save the bundle
    const newBundle = await this.bundleRepository.save(bundle);

    // Update products to mark them as part of a bundle
    await Promise.all(
      products.map(async (product) => {
        product.isBundle = true;
        await this.productRepository.save(product);
      }),
    );

    serviceResponse.data = {
      bundle: newBundle,
    };
    return serviceResponse;
  }

  async findAllBundles(
    query: ListBundlesDto,
  ): Promise<{ data: Bundle[]; total: number }> {
    const { search, page = 1, limit = 25 } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.bundleRepository
      .createQueryBuilder('bundle')
      .leftJoinAndSelect('bundle.creator', 'creator')
      .leftJoinAndSelect('bundle.products', 'product')
      .orderBy('bundle.creationDate', 'DESC')
      .skip(skip)
      .take(limit);

    if (search) {
      queryBuilder.andWhere(
        'bundle.name LIKE :search OR creator.username LIKE :search OR creator.email LIKE :search',
        { search: `%${search}%` },
      );
    }

    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total };
  }

  async getBundle(id: number): Promise<Bundle> {
    return this.bundleRepository.findOne({
      where: { id },
      relations: ['creator', 'products'],
    });
  }

  async updateBundle(
    id: number,
    updateBundleDto: UpdateBundleDto,
  ): Promise<ServiceResponse> {
    const serviceResponse: ServiceResponse = { data: null, error: null };

    const bundle = await this.bundleRepository.findOne({
      where: { id },
      relations: ['creator', 'products'],
    });
    if (!bundle) {
      serviceResponse.error = 'Bundle not found';
      return serviceResponse;
    }

    if (updateBundleDto.creatorId) {
      const newCreator = await this.userService.getUser(
        updateBundleDto.creatorId,
      );
      if (!newCreator) {
        serviceResponse.error = 'New creator not found';
        return serviceResponse;
      }
      bundle.creator = newCreator;
    }

    if (updateBundleDto.name !== undefined) {
      bundle.name = updateBundleDto.name;
    }

    if (updateBundleDto.description !== undefined) {
      bundle.description = updateBundleDto.description;
    }

    if (updateBundleDto.productIds !== undefined) {
      const products = await this.productRepository.findByIds(
        updateBundleDto.productIds,
      );
      bundle.products = products;
    }

    const updatedBundle = await this.bundleRepository.save(bundle);

    serviceResponse.data = {
      bundle: updatedBundle,
    };
    return serviceResponse;
  }

  async removeBundle(id: number): Promise<{ affected?: number }> {
    return this.bundleRepository.delete(id);
  }

  async findByIds(ids: number[]): Promise<Bundle[]> {
    return this.bundleRepository.find({
      where: { id: In(ids) },
    });
  }
}
