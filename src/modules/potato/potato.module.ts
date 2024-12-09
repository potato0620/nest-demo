import { Module } from '@nestjs/common';
import { PotatoService } from './potato.service';
import { PotatoController } from './potato.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({ timeout: 5000 })],
  controllers: [PotatoController],
  providers: [PotatoService],
  exports: [PotatoService],
})
export class PotatoModule {}
