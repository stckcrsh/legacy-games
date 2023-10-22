import { Injectable } from '@nestjs/common';
import { User } from './user';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: "1",
      username: 'john',
      password: 'changeme',
      token: 'sometoken'
    },
    {
      userId: "2",
      username: 'maria',
      password: 'guess',
      token: null
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
