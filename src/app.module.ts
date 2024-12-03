import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CatsModule } from '~/modules/cats/cats.module';
import { PotatoModule } from '~/modules/potato/potato.module';
import { LoginVerify } from '~/middleware/login.middleware';
import { TestMiddleware } from '~/middleware/test.middelware';
import { RolesGuard } from '~/utils/roles.guard';

@Module({
  imports: [CatsModule, PotatoModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // 也可以在这里全局注入
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    // consumer.apply(LoginMiddleware).forRoutes('*');
    consumer.apply(LoginVerify).forRoutes({
      path: 'cats',
      method: RequestMethod.GET, // 应用于特定路由和方法
    });

    // consumer.apply(TestMiddleware).forRoutes({
    //   path: 'cats',
    //   method: RequestMethod.ALL,
    // });
  }
}
