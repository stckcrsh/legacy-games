import { v4 } from 'uuid';

import { Injectable } from '@nestjs/common';

import { User } from './user';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: '1',
      username: 'john',
      password: 'changeme',
      token: 'sometoken',
      inventory: [
        [v4(), 'slicks'],
        [v4(), 'drum'],
        [v4(), 'v8'],
      ],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
