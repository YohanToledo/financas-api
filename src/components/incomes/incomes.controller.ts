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
  Query,
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
import { CreateIncomeDto } from './dto/create-income.dto';
import { IncomesService } from './incomes.service';
import { Params } from './dto/query-params.dto';

@ApiTags('Incomes')
@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Find All incomes' })
  @ApiBearerAuth('JWT')
  async findAll(
    @DecodedToken() decoded: IDecodedToken,
    @Query() params: Params,
  ) {
    return this.incomesService.findAllByUser(decoded.sub, params);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create Income' })
  @ApiBody({ type: ResponseAndReturnTypes.IncomesDto })
  @ApiBearerAuth('JWT')
  async save(
    @DecodedToken() decodedToken: IDecodedToken,
    @Body() data: CreateIncomeDto,
  ) {
    return this.incomesService.save(data, decodedToken.sub);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update Income' })
  @ApiBody({ type: ResponseAndReturnTypes.IncomesDto })
  @ApiOkResponse({ status: 200 })
  @ApiBearerAuth('JWT')
  async update(@Param('id') id: number, @Body() body: CreateIncomeDto) {
    return await this.incomesService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Income' })
  @ApiBearerAuth('JWT')
  async delete(@Param('id') id: number) {
    await this.incomesService.delete(id);
  }
}
