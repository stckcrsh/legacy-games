import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { User } from '../users/user';

export const AuthUser = createParamDecorator(
  (_, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();

    return request['user'];
  }
);
