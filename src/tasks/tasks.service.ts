import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_5_SECONDS, {
    name: 'potato', // 任务名称 为了可以在其他地方获取任务进行操作
    disabled: true,
  })
  logTask(): void {
    this.logger.debug('task test debug !!!');
  }

  // @Cron(CronExpression.EVERY_5_SECONDS, {
  //   disabled: false,
  // })
  // @Interval('potato1', 1000) // 自定义重复执行间隔 毫秒
  // logTask2(): void {
  //   this.logger.debug('task test custom interval !!!');
  // }

  @Timeout(1000) // 程序启动后x秒后执行一次
  handleTimeout(): void {
    this.logger.debug('Called once after 5 seconds');
  }
}
