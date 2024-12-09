import { Exclude, Expose } from 'class-transformer';

export class CatEntity {
  id: number;
  name: string;
  @Exclude()
  age: number;
  breed: string;

  @Expose() // 类似于计算函数 暴露一个属性 但在表里不存在
  get helloName(): string {
    return `hello ${this.name}`;
  }

  // constructor(partial: Partial<CatEntity>) {
  //   Object.assign(this, partial);
  // }
}
