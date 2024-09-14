import { Module } from '@nestjs/common';
import { CatsModule } from '~/modules/cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
