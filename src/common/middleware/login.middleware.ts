import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class LoginMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: () => void): void {
//     console.log('verify successfully');
//     next();
//   }
// }

// 函数中间件
export function LoginVerify(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  next();
}
