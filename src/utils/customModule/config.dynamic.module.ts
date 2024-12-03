import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class ConfigModule {
  static register(value: string): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: value,
          useValue: { name: 'potato' },
        },
      ],
      exports: [value],
    };
  }
}
