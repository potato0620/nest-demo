import { PartialType } from '@nestjs/mapped-types';
import {
  HttpException,
  Injectable,
  HttpStatus,
  MethodNotAllowedException,
  NotFoundException,
  Scope,
  OnModuleInit,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto } from './dto/cats.dto';
import { Cat } from './interfaces/cat.interface';
import { ModuleRef } from '@nestjs/core';

@Injectable({
  scope: Scope.DEFAULT, // 指定服务的作用域范围 "DEFAULT" "REQUEST" "TRANSIENT" 详细查看文档
})
export class CatsService implements OnModuleInit {
  private cats: Cat[] = [];

  constructor(private moduleRef: ModuleRef) {}

  public onModuleInit(): void {
    const mockCats = Array.from({ length: 50 }, (_, index) => {
      return {
        id: index,
        name: `猫咪-${index}`,
        age: index,
        breed: `猫咪品种-${index}`,
      };
    });
    this.cats = mockCats;
  }

  public findAllCats(): Cat[] {
    return this.cats;
  }

  public findCatById(ids: number[]): Cat[] {
    return this.cats.filter((cat) => ids.includes(cat.id)) || [];
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
