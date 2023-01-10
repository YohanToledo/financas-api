import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DecodedToken } from 'src/decorators/decoded-jwt.decorator';
import { IDecodedToken } from 'src/decorators/interface.decoded';
import { ResponseAndReturnTypes } from 'src/helper/swagger.helper';
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
  @ApiBody({ type: ResponseAndReturnTypes.CategoryExample })
  @ApiBearerAuth('JWT')
  async save(
    @Body() data: CreateCategoryDto,
    @DecodedToken() decodedJwt: IDecodedToken,
  ) {
    return this.categoryService.save(data, decodedJwt.sub);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update Category' })
  @ApiBody({ type: ResponseAndReturnTypes.CategoryExample })
  @ApiOkResponse({ status: 200 })
  @ApiBearerAuth('JWT')
  async update(@Param('id') id: number, @Body() body: CreateCategoryDto) {
    return await this.categoryService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Category' })
  @ApiBearerAuth('JWT')
  async delete(@Param('id') id: number) {
    await this.categoryService.delete(id);
  }
}
