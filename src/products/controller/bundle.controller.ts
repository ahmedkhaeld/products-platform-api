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

import { BundleService } from '../service/bundle.service';
import { CreateBundleDto } from '../dto/create-bundle.dto';
import { ListBundlesDto } from '../dto/list-bundles.dto';
import { Bundle } from '../entities/bundle.entity';
import { UpdateBundleDto } from '../dto/update-bundle.dto';

import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAdminAuthGuard } from '../../auth/guard/jwt-admin.guard';

@ApiTags('bundles')
@Controller('bundles')
export class ProductsBundleController {
  constructor(private readonly bundleService: BundleService) {}

  @UseGuards(JwtAdminAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Bundle created successfully',
  })
  createBundle(@Body() createBundleDto: CreateBundleDto) {
    return this.bundleService.createBundle(createBundleDto);
  }
  @UseGuards(JwtAdminAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'List of all bundles',
  })
  async listBundles(
    @Query() query: ListBundlesDto,
  ): Promise<{ data: Bundle[]; total: number }> {
    return this.bundleService.findAllBundles(query);
  }
  @UseGuards(JwtAdminAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Bundle details retrieved successfully',
  })
  findOne(@Param('id') id: string) {
    return this.bundleService.getBundle(+id);
  }
  @UseGuards(JwtAdminAuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Bundle details updated successfully',
  })
  update(@Param('id') id: string, @Body() updateBundleDto: UpdateBundleDto) {
    return this.bundleService.updateBundle(+id, updateBundleDto);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Bundle deleted successfully',
  })
  remove(@Param('id') id: string) {
    return this.bundleService.removeBundle(+id);
  }
}
