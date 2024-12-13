import { throwError } from 'rxjs';
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
  UseInterceptors,
  Inject,
  Scope,
  forwardRef,
  ParseArrayPipe,
  Query,
  HttpException,
  ClassSerializerInterceptor,
  SerializeOptions,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto, UpdateCatDto } from './dto/cats.dto';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from '~/common/exceptions/http-exception.filter';
import { ValidationPipe } from '~/common/pipes/validation.pipe';
import { RolesGuard } from '~/common/guards/roles.guard';
import {
  LoggingInterceptor,
  TransformInterceptor,
  CacheInterceptor,
  TimeoutInterceptor,
} from '~/common/interceptors';

import { CustomDecorator } from '~/common/decorators/custom.decorator';
import { Reflector } from '@nestjs/core';
import { CatEntity } from './cats.entity';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

// import { ValueTest } from '~/common';

@ApiTags('猫咪')
@ApiBearerAuth()
@Controller({
  path: 'cats',
  scope: Scope.REQUEST,
  // version: '1',
})
// @UseFilters(new HttpExceptionFilter()) // 可以把异常过滤器放在这里
// @UseGuards(RolesGuard, RolesGuard) // 支持多个
// @UseInterceptors(LoggingInterceptor) // 支持多个
// @SkipThrottle() // 关闭此控制器的节流
export class CatsController {
  constructor(
    @Inject(forwardRef(() => CatsService))
    private readonly catsService: CatsService,

    @Inject('ValueTest') private readonly valueTest: string,

    private reflector: Reflector,
  ) {}

  @Get()
  // @SkipThrottle() // 关闭此路由的节流
  @Throttle({ default: { ttl: 1000 * 10, limit: 50 } }) // 覆盖全局节流配置
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    type: CatEntity, //自动转换为CatEntity实例，并应用相关的装饰器
  })
  getCats(
    @Query(
      'ids',
      new ParseArrayPipe({
        items: Number,
        separator: ',',
        exceptionFactory: (): void => {
          // 自定义异常
          throw new HttpException('id必须为number', HttpStatus.BAD_REQUEST);
        },
      }),
    )
    ids: number[],
  ): Cat[] {
    return this.catsService.findCatById(ids);

    return [
      {
        id: 1,
        name: '小黑',
        age: 3,
        breed: '英短',
      },
    ];
  }

  @Get('/all')
  // @Redirect('https://www.zhinan.tech', 301)
  // @UseFilters(new HttpExceptionFilter()) // 也可以放这
  // @UseGuards(RolesGuard, RolesGuard) // 支持多个
  @UseInterceptors(
    LoggingInterceptor,
    TransformInterceptor,
    CacheInterceptor,
    TimeoutInterceptor,
  )
  async getAllCats(): Promise<Cat[]> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.catsService.findAllCats());
      }, 0); // 演示可以异步
    });
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
