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
  UseFilters,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto, UpdateCatDto } from './dto/cats.dto';
import { Cat } from './interface/interface';
import { HttpExceptionFilter } from '~/utils/http-exception.filter';
import { ValidationPipe } from '~/utils/validation.pipe';
import { RolesGuard } from '~/utils/roles.guard';

@Controller({
  path: 'cats',
})
// @UseFilters(new HttpExceptionFilter()) // 可以把异常过滤器放在这里
// @UseGuards(RolesGuard, RolesGuard) // 支持多个
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  // @Redirect('https://www.zhinan.tech', 301)
  // @UseFilters(new HttpExceptionFilter()) // 也可以放这
  getAllCats(): Cat[] {
    return this.catsService.findAllCats();
  }

  @Get(':id')
  getOneCat(
    @Param(
      'id',
      new ParseIntPipe({
        // 可以自定义状态码
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ): Cat | Record<string, never> {
    return this.catsService.findCatById(id);
    // throw new NotFoundException('error');
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
