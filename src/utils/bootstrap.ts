import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Type } from '@nestjs/common';
import { json } from 'express';
import { TestMiddleware } from '~/middleware/test.middelware';
import { HttpExceptionFilter } from './http-exception.filter';
import { RolesGuard } from '~/common/guards/roles.guard';
import { LoggingInterceptor } from '~/utils/logging.interceptor';
import { listenRandomPort } from './random-port';
import os from 'os';

function getLocalIPAddress(): string {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]!) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

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
  const app = await NestFactory.create(AppModule);

  options.prefix && app.setGlobalPrefix(options.prefix);

  app.use(json({ limit: '100mb' }));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const localIP = getLocalIPAddress();

  if (options.port) {
    await app.listen(options.port);
    console.log(
      `\x1b[32m[Nest] ${options.name} listening at: \x1b[34mhttp://${localIP}:${options.port}\x1b[0m`,
    );
    console.log(
      `\x1b[32m[Nest] ${options.name} also accessible at: \x1b[34mhttp://localhost:${options.port}\x1b[0m`,
    );
    console.log(
      `\x1b[32m[Nest] ${options.name} apiDocs listening at: \x1b[34mhttp://${localIP}:${options.port}${
        options.prefix || ''
      }/docs\x1b[0m`,
    );
    console.log(
      `\x1b[32m[Nest] ${options.name} apiDocs also accessible at: \x1b[34mhttp://localhost:${options.port}${
        options.prefix || ''
      }/docs\x1b[0m`,
    );
  } else {
    throw new Error('port is required');
    // or random port
    listenRandomPort(
      app,
      `port.${process.env.NODE_ENV || 'dev'}.json`,
      options.prefix,
    );
  }
}
