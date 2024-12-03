import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { authorization } = context.switchToHttp().getRequest().headers;
    if (!authorization) {
      throw new HttpException('登陆失效 请重新登陆', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}

export { RolesGuard };
