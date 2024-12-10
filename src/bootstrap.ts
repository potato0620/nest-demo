import { NestFactory } from '@nestjs/core';
import {
  ValidationPipe,
  Type,
  VersioningType,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { json } from 'express';
import { TestMiddleware } from '~/common/middleware/test.middleware';
import { HttpExceptionFilter } from '~/common/exceptions/http-exception.filter';
import { RolesGuard } from '~/common/guards/roles.guard';
import { LoggingInterceptor } from '~/common/interceptors/logging.interceptor';
import { listenRandomPort } from './utils/random-port';
import os from 'os';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { constants } from 'zlib';
import { join } from 'path';
import helmet from 'helmet';
import {
  DocumentBuilder,
  SwaggerModule,
  OpenAPIObject,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

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
  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn', 'debug', 'log', 'fatal'], // 控制台日志输出级别
  });

  options.prefix && app.setGlobalPrefix(options.prefix);

  injectDependencies(app);

  swaggerConfig(app, options);

  printStartMessage(app, options);
}

async function injectDependencies(app): Promise<void> {
  app.enableCors({
    origin: ['http://localhost:5656', 'http://zhinan.tech'], // 开启跨域 仅限制定域名
    credentials: true,
  });

  app.use(compression()); // 开启压缩 gzip
  app.use(json({ limit: '100mb' })); // 注入json解析器 设置请求体大小
  app.use(cookieParser()); // 注册cookie解析中间件
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: false })); // 注入验证管道 开启白名单验证 开启自动转换
  app.enableVersioning({
    type: VersioningType.URI,
    // defaultVersion: '1', // 默认版本 [版本1]
    defaultVersion: VERSION_NEUTRAL, // 默认版本 [无版本]
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  app.use(helmet());
}

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

function swaggerConfig(app, options): void {
  const config = new DocumentBuilder()
    .setTitle('potato API')
    .setBasePath(`${options.prefix ? `/${options.prefix}` : ''}/docs`)
    .setDescription('好，这就是接口文档')
    .setContact('potato', 'https://github.com/zhaojinzhi', '1121592239@qq.com')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      description: '调取登陆接口获取token后填入，通过认证以调用以下接口',
    })
    .build();
  const documentFactory = (): OpenAPIObject =>
    SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'potato API',
    raw: true,
    url: '/docs-json',
  };

  SwaggerModule.setup(
    options.prefix ? `${options.prefix}/docs` : 'docs',
    app,
    documentFactory,
    customOptions,
  );
}

async function printStartMessage(app, options): Promise<void> {
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
