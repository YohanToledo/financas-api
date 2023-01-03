import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseAndReturnTypes } from 'src/helper/swagger.helper';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: ResponseAndReturnTypes.JwtExampleRes })
  @ApiBody({ type: ResponseAndReturnTypes.LoginExampleReq })
  @ApiOperation({
    summary: 'Validate user and return jwt access token',
  })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }
}
