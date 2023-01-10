import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DecodedToken } from 'src/decorators/decoded-jwt.decorator';
import { IDecodedToken, IJwt } from 'src/decorators/interface.decoded';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('Categories')
@Controller('api/v1/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Find All Categories' })
  @ApiBearerAuth('JWT')
  async findAll(@DecodedToken() decodedJwt: IDecodedToken) {
    return this.categoryService.findAllByUser(decodedJwt.sub);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create Category' })
  @ApiBearerAuth('JWT')
  async save(
    @Body() data: CreateCategoryDto,
    @DecodedToken() decodedJwt: IDecodedToken,
  ) {
    return this.categoryService.save(data, decodedJwt.sub);
  }
}
