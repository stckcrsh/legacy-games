import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthUser } from './auth.decorators';
import { User } from '../users/user';

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

    console.log(result);
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
