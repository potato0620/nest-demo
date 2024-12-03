import { Module, Scope } from '@nestjs/common';
import { Global } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { ValueTest, POTATO } from '~/common';
import { ConfigModule } from '~/utils/customModule/config.dynamic.module';

@Global() // 全局注册
@Module({
  imports: [ConfigModule.register('POTATO')],
  controllers: [CatsController],
  providers: [
    // CatsService,
    {
      provide: CatsService,
      useClass: CatsService, // 如果使用和上面provide不同的Class 会覆盖掉CatsService
      scope: Scope.DEFAULT,
    },
    {
      provide: 'POTATO',
      useValue: POTATO,
    },
    {
      provide: 'CatsService',
      useExisting: CatsService, // 两个注入的是同一个实例 用UseExisting
    },
    {
      // 注入一个常量 enum symbol 值 useValue
      provide: 'ValueTest',
      useValue: ValueTest,
    },
    {
      provide: 'CONNECTION',
      useFactory: async (...args): Promise<string> => {
        console.log('args================', args);
        return await new Promise(
          (resolve) => setTimeout(() => resolve('get it'), 3000), // 异步注入依赖
        );
      },
      inject: ['POTATO'], // 注入Factory的参数
    },
  ],
  exports: [ConfigModule],
})
export class CatsModule {}
