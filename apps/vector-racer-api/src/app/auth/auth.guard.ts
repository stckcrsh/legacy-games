import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const user = request.cookies['user'];
    const token = request.cookies['token'];

    console.log(user, token)

    const result = this.authService.signInToken(user, token);
    if (result) {
      request['user'] = result;
      return true;
    }
    throw new UnauthorizedException();
  }
}
