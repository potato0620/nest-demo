import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class TestMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: () => void): void {
//     console.log('test middleware');
//     next();
//   }
// }

export function TestMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  console.log('test middleware');
  next();
}
