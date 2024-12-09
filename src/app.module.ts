import {
  Module,
  MiddlewareConsumer,
  RequestMethod,
  NestModule,
} from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_GUARD } from '@nestjs/core';
import { CatsModule } from '~/modules/cats/cats.module';
import { PotatoModule } from '~/modules/potato/potato.module';
import { TasksModule } from '~/tasks/tasks.module';
import { LoginVerify, TestMiddleware } from '~/common/middleware';
import { RolesGuard } from '~/common/guards/roles.guard';
import { AuthModule } from '~/modules/auth/auth.module';
import { UsersModule } from '~/modules/users/users.module';
import { EventsModule } from './modules/events/events.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    CatsModule,
    PotatoModule,
    TasksModule,
    AuthModule,
    UsersModule,
    EventsModule,
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([{ ttl: 1000 * 10, limit: 100 }]), // 全局限流 十秒内最多可以请求100次
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // 也可以在这里全局注入
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // 节流全局注入
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // consumer.apply(LoginMiddleware).forRoutes('*');
    // consumer.apply(LoginVerify).forRoutes({
    //   path: 'cats',
    //   method: RequestMethod.GET, // 应用于特定路由和方法
    // });
    consumer.apply(TestMiddleware).forRoutes({
      path: 'cats',
      method: RequestMethod.ALL,
      version: '1',
    });
  }
}
