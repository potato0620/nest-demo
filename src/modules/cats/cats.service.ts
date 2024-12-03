import {
  HttpException,
  Injectable,
  HttpStatus,
  MethodNotAllowedException,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto } from './dto/cats.dto';
import { Cat } from './interface/interface';
import { ModuleRef } from '@nestjs/core';

@Injectable({
  scope: Scope.DEFAULT, // 指定服务的作用域范围 "DEFAULT" "REQUEST" "TRANSIENT" 详细查看文档
})
export class CatsService {
  private cats: Cat[] = [];

  constructor(private moduleRef: ModuleRef) {
    this.initCats();
  }

  private initCats(): void {
    console.log(
      'catService: ',
      this.moduleRef.get('CatsService', { strict: false }),
    );
  }

  public findAllCats(): Cat[] {
    // throw new MethodNotAllowedException();

    return this.cats;
  }

  public findCatById(id: number): Cat | Record<string, never> {
    return this.cats.filter((cat) => cat.id === id)[0] || {};
  }

  public create(payload: CreateCatDto): Cat {
    this.cats.push({
      id: this.cats.length,
      name: payload.name,
      age: payload.age,
      breed: payload.breed,
    });

    return this.cats[this.cats.length - 1];
  }

  public deleteCat(id: string | string[]): string {
    return `delete successfully: ${id}`;
  }

  public updateCat(payload: UpdateCatDto, id: number): string {
    this.cats.forEach((cat) => {
      if (cat.id === id) {
        cat.name = payload.name;
      }
    });

    return 'update successfully';
  }
}
