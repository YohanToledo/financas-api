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
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { ResponseAndReturnTypes } from 'src/helper/swagger.helper';
import { CreateUserDto } from './dto/crete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [ResponseAndReturnTypes.FindUserRes] })
  @ApiOperation({ summary: 'Find All Users' })
  @ApiBearerAuth('JWT')
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Find User by ID' })
  @ApiOkResponse({ type: ResponseAndReturnTypes.FindUserRes })
  @ApiBearerAuth('JWT')
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOneOrFail({
      where: { id: id },
      select: [
        'id',
        'fullName',
        'email',
        'createdAt',
        'updatedAt',
        'deletedAt',
      ],
    });
  }

  @Post()
  @ApiOperation({
    summary: 'Register User',
  })
  @ApiBody({ type: ResponseAndReturnTypes.CreateUserExampleReq })
  @ApiCreatedResponse({ type: ResponseAndReturnTypes.UserCreatedRes })
  async save(@Body() body: CreateUserDto) {
    return this.usersService.save(body);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update User' })
  @ApiBody({ type: ResponseAndReturnTypes.UpdateUserExampleReq })
  @ApiOkResponse({ status: 200 })
  @ApiBearerAuth('JWT')
  async update(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return await this.usersService.update(id, body);
  }

  @Put('/password/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update Password' })
  @ApiBody({ type: UpdatePasswordDto })
  @ApiNoContentResponse({ status: 200 })
  @ApiBearerAuth('JWT')
  async updatePassword(
    @Param('id') id: number,
    @Body() body: UpdatePasswordDto,
  ) {
    return await this.usersService.updatePassword(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete User' })
  @ApiBearerAuth('JWT')
  async delete(@Param('id') id: number) {
    await this.usersService.delete(id);
  }
}
