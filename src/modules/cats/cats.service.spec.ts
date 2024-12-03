import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';

interface Cat {
  name: string;
  age: number;
  breed: string;
}

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  describe('create', () => {
    it('应该能创建一只新猫', () => {
      const cat: Cat = {
        name: '小花',
        age: 2,
        breed: '中华田园猫',
      };

      const result = service.create(cat);
      expect(result).toBeDefined();
      expect(result.name).toBe('小花');
    });
  });

  describe('findAll', () => {
    it('应该返回猫咪列表', () => {
      const result = service.findAllCats();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('应该能通过ID找到指定的猫', () => {
      const cat: Cat = {
        name: '小黑',
        age: 3,
        breed: '英短',
      };

      service.create(cat);
      const result = service.findCatById(0);
      expect(result).toBeDefined();
      expect(result.name).toBe('小黑');
    });

    it('当找不到猫时应该返回undefined', () => {
      const result = Object.keys(service.findCatById(999)).length === 0;

      expect(result).toBe(true);
    });
  });
});
