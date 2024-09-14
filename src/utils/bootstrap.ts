import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { listenRandomPort } from './random-port';

export async function bootstrap(
  AppModule: any,
  options: {
    enableCors?: boolean;
    prefix?: string;
    name: string;
    port?: string;
    apiDocs: boolean;
  },
) {
  const enableCors = options.enableCors ?? true;

  const app = await NestFactory.create(AppModule);

  options.prefix && app.setGlobalPrefix(options.prefix);

  enableCors && app.enableCors({ origin: true, credentials: true });

  app.use(json({ limit: '100mb' }));

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
