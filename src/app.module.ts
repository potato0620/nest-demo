import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CatsModule } from '~/modules/cats/cats.module';
import { LoginVerify } from '~/middleware/login.middleware';
import { TestMiddleware } from '~/middleware/test.middelware';

@Module({
  imports: [CatsModule],
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
