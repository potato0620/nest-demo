import { NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

export class ReqIpShowMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ReqIpShowMiddleware.name);

  use(req: Request, res: Response, next: () => void): void {
    const ip = new IpFormatter(req.ip).Ipv4;
    this.logger.log(
      `[${req.method}] request form ${ip} path: ${req.originalUrl}`,
    );
    next();
  }
}

class IpFormatter {
  constructor(private readonly ip: string) {}
  get Ipv4(): string {
    return this.ip.replace(/^::ffff:/, '');
  }

  get ipv6(): string {
    return this.ip;
  }
}
