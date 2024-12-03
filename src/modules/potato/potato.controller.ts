import { Controller, Get } from '@nestjs/common';

@Controller('potato')
export class PotatoController {
  constructor() {}
  @Get()
  getTest(): string {
    return 'hello potato';
  }
}
