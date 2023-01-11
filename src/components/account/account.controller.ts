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
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Find All Accounts' })
  @ApiBearerAuth('JWT')
  async findAll(@DecodedToken() decoded: IDecodedToken) {
    return this.accountService.findAllByUser(decoded.sub);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create Account' })
  @ApiBody({ type: ResponseAndReturnTypes.Account })
  @ApiBearerAuth('JWT')
  async save(@Body() data: CreateAccountDto) {
    return this.accountService.save(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update Account' })
  @ApiBody({ type: ResponseAndReturnTypes.Account })
  @ApiOkResponse({ status: 200 })
  @ApiBearerAuth('JWT')
  async update(@Param('id') id: number, @Body() body: UpdateAccountDto) {
    return await this.accountService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Account' })
  @ApiBearerAuth('JWT')
  async delete(@Param('id') id: number) {
    await this.accountService.delete(id);
  }
}
