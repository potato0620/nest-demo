import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './cats.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCats(@Query() query: { name: string }): string[] {
    console.log(query.name, 'queryName');
    const result = Array.from({ length: 100 }).map((_, i) => {
      return `cats${query.name}: ${i}`;
    });
    return [...result];
  }

  @Get(':id')
  getOneCat(@Param('id') id: string): { name: string }[] {
    return [{ name: `cats: ${id}` }, { name: '嘻嘻嘻fuck you bro get' }];
  }

  @Post()
  createCat(@Body() payload: CreateCatDto): string {
    console.log(payload, 'payload');

    return 'create successfully';
  }

  @Delete()
  deleteCat(@Body('id') id: string | string[]): string {
    return `delete successfully: ${id}`;
  }

  @Put()
  updateCat(@Body() payload: CreateCatDto): string {
    return `update successfully: ${payload.name}`;
  }
}
