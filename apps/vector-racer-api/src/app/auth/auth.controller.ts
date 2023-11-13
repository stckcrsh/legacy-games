import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';

import { User } from '../users/user';
import { AuthUser } from './auth.decorators';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: Record<string, any>,
    @Res({ passthrough: true }) response: Response
  ) {
    const result = await this.authService.signIn(
      signInDto.username,
      signInDto.password
    );

    // @ts-ignore
    response.cookie('user', result.username);
    // @ts-ignore
    response.cookie('token', result.token);
    return result;
  }

  @Get()
  @UseGuards(AuthGuard)
  async get(@AuthUser() user: User) {
    return user;
  }
}
