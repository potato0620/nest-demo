import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  public async login(body: LoginDto): Promise<Record<string, any>> {
    const { email, password } = body;

    const user = this.usersService.findUserByEmail(email); // 查询用户

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    if (user.password !== password) {
      throw new BadRequestException('密码错误');
    }

    const { userId, username } = user;

    const tokin = await this.jwtService.signAsync({ email, password });

    return {
      token: tokin,
      user: {
        userId,
        username,
      },
    };
  }
}
