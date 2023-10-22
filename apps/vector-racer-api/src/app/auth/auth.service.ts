import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user || user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }

  async signInToken(_username: string, _token: string) {
    const user = await this.usersService.findOne(_username);
    if (!user || user?.token !== _token) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    return result;
  }
}
