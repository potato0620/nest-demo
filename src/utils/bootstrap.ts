import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import { listenRandomPort } from './random-port';
import { TestMiddleware } from '~/middleware/test.middelware';

export async function bootstrap(
  AppModule: any,
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

  app.use(TestMiddleware); // 在app.use中只能使用函数中间件

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
