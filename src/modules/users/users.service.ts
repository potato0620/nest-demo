import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'potato',
      email: '1121592239@qq.com',
      password: '123456',
    },
    {
      userId: 2,
      username: 'tomato',
      email: '1121592239@qq.com',
      password: '78910',
    },
  ];

  public findUserByEmail(email: string): User {
    return this.users.find((user) => user.email === email);
  }
}

interface User {
  userId: number;
  username: string;
  email: string;
  password: string;
}
