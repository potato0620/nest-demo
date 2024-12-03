import {
  Injectable,
  OnModuleInit,
  OnApplicationBootstrap,
} from '@nestjs/common';

@Injectable()
export class PotatoService implements OnApplicationBootstrap {
  constructor() {}
  async onApplicationBootstrap(): Promise<void> {
    // const chalk = (await import('chalk')).default;
    console.log('potato service start right now');
  }
}
