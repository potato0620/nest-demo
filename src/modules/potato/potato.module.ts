import { Module } from '@nestjs/common';
import { PotatoService } from './potato.service';
import { PotatoController } from './potato.controller';

@Module({
  controllers: [PotatoController],
  providers: [PotatoService],
  exports: [PotatoService],
})
export class PotatoModule {}
