import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
  HttpCode,
  Header,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto, UpdateCatDto } from './dto/cats.dto';
import { Cat } from './interface/interface';

@Controller({
  path: 'cats',
})
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  // @Redirect('https://www.zhinan.tech', 301)
  getAllCats(): Cat[] {
    return this.catsService.findAllCats();
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe) id: number): Cat {
    return this.catsService.findCatById(id);
  }

  @Post()
  @Header('Cache-Control', 'no-store')
  @HttpCode(200)
  createCat(@Body() payload: CreateCatDto): Cat {
    return this.catsService.create(payload);
  }

  @Delete()
  deleteCat(@Body('id') id: string | string[]): string {
    return `delete successfully: ${id}`;
  }

  @Put(':id')
  updateCat(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCatDto,
  ): string {
    return this.catsService.updateCat(payload, id);
  }
}
