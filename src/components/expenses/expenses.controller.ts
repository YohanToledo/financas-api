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
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpensesService } from './expenses.service';
import { Params } from './dto/query-params.dto';

@ApiTags('Expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Find All Expenses' })
  @ApiBearerAuth('JWT')
  async findAll(
    @DecodedToken() decoded: IDecodedToken,
    @Query() params: Params,
  ) {
    return this.expensesService.findAllByUser(decoded.sub, params);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create Expense' })
  @ApiBody({ type: ResponseAndReturnTypes.ExpensesDto })
  @ApiBearerAuth('JWT')
  async save(
    @DecodedToken() decodedToken: IDecodedToken,
    @Body() data: CreateExpenseDto,
  ) {
    return this.expensesService.save(data, decodedToken.sub);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update Expense' })
  @ApiBody({ type: ResponseAndReturnTypes.ExpensesDto })
  @ApiOkResponse({ status: 200 })
  @ApiBearerAuth('JWT')
  async update(@Param('id') id: number, @Body() body: CreateExpenseDto) {
    return await this.expensesService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Expense' })
  @ApiBearerAuth('JWT')
  async delete(@Param('id') id: number) {
    await this.expensesService.delete(id);
  }
}
