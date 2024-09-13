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

  if (options.prefix) {
    app.setGlobalPrefix(options.prefix);
  }

  if (enableCors) {
    app.enableCors({ origin: true, credentials: true });
  }

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
    await listenRandomPort(
      app,
      `port.${process.env.NODE_ENV || 'dev'}.json`,
      options.prefix,
    );
  }
}
