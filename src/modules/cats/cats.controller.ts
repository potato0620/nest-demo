import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Get()
  findAll(): { name: string }[] {
    return [{ name: 'cats' }, { name: '嘻嘻嘻' }];
  }
}
