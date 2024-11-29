import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Type } from '@nestjs/common';
import { json } from 'express';
import { listenRandomPort } from './random-port';
import { TestMiddleware } from '~/middleware/test.middelware';
import { HttpExceptionFilter } from './http-exception.filter';
import { RolesGuard } from '~/utils/roles.guard';

export async function bootstrap(
  AppModule: Type<any>,
  options: {
    enableCors?: boolean;
    prefix?: string;
    name: string;
    port?: string;
    apiDocs: boolean;
  },
): Promise<void> {
  // const enableCors = options.enableCors ?? true;

  const app = await NestFactory.create(AppModule);

  options.prefix && app.setGlobalPrefix(options.prefix);

  // enableCors && app.enableCors({ origin: true, credentials: true });

  app.use(json({ limit: '100mb' }));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // app.use(TestMiddleware); // 在app.use中只能使用函数中间件
  // app.useGlobalFilters(new HttpExceptionFilter()); // 全局注册 自定义异常处理
  // app.useGlobalGuards(new RolesGuard()); // 全局注册 身份验证

  if (options.port) {
    await app.listen(options.port);
    console.log(
      `${options.name} is listening at: http://localhost:${options.port}`,
    );
    console.log(
      `${options.name} is listening at: http://localhost:${options.port}${
        options.prefix || ''
      }/docs`,
    );
  } else {
    // TODO: 随机端口有无现成库 ？？
    await listenRandomPort(
      app,
      `port.${process.env.NODE_ENV || 'dev'}.json`,
      options.prefix,
    );
  }
}
