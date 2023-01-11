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
import { ResponseAndReturnTypes } from 'src/helper/swagger.helper';
import { BankService } from './bank.service';
import { BankDto } from './dto/bank.dto';

@ApiTags('Banks')
@Controller('banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Find All Banks' })
  @ApiBearerAuth('JWT')
  async findAll() {
    return this.bankService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create Bank' })
  @ApiBody({ type: ResponseAndReturnTypes.BankExample })
  @ApiBearerAuth('JWT')
  async save(@Body() data: BankDto) {
    return this.bankService.save(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update Bank' })
  @ApiBody({ type: ResponseAndReturnTypes.BankExample })
  @ApiOkResponse({ status: 200 })
  @ApiBearerAuth('JWT')
  async update(@Param('id') id: number, @Body() body: BankDto) {
    return await this.bankService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Bank' })
  @ApiBearerAuth('JWT')
  async delete(@Param('id') id: number) {
    await this.bankService.delete(id);
  }
}
