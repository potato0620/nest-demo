import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
class RolesGuard implements CanActivate {
  private logger = new Logger(RolesGuard.name);

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('public', [
      // class 优先级比 method 高 可以覆盖
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const { authorization } = context.switchToHttp().getRequest().headers;
    const token = authorization ? authorization.replace(/^Bearer /, '') : '';

    if (!authorization) {
      throw new HttpException('登陆失效 请重新登陆', HttpStatus.UNAUTHORIZED);
    }

    try {
      await this.jwtService.verifyAsync(token);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('登陆失效 请重新登陆', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}

export { RolesGuard };
