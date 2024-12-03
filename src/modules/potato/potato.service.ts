import { Injectable } from '@nestjs/common';

@Injectable()
export class PotatoService {
  constructor() {
    this.init();
  }

  private init(): void {
    console.log('potato service init');
  }
}
