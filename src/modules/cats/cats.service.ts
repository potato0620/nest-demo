import { Injectable } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto } from './dto/cats.dto';
import { Cat } from './interface/interface';

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  constructor() {
    this.initCats();
    console.log('init cat successfully');
  }

  private initCats(): void {
    this.cats = [
      {
        id: 0,
        name: 'Potato',
        age: 3,
        breed: 'Maine Coon',
      },
      {
        id: 1,
        name: 'Tom',
        age: 2,
        breed: 'British Shorthair',
      },
    ];
  }

  public findAllCats(): Cat[] {
    return this.cats;
  }

  public findCatById(id: number): Cat {
    return this.cats.filter((cat) => cat.id === id)[0] || null;
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
