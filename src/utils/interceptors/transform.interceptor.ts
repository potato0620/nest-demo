import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { resolve } from 'path';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { sleep } from '~/utils/sleep';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Response<T>>> {
    // 可以为异步方法
    // await sleep(3000);
    // 可以在pipe里面像中间件一样处理数据
    return next.handle().pipe(
      // tap((data) => {
      //   data.forEach((item) => {
      //     console.log(item.name);
      //   });
      // }),
      map((data) => ({
        code: 200,
        message: 'success',
        date: new Date().toISOString(),
        data,
      })),
    );
  }
}
