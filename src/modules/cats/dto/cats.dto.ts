import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class CreateCatDto {
  @IsNotEmpty({ message: 'name is required' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'age is required' })
  @IsNumber({}, { message: 'age must be a number' })
  age: number;

  @IsNotEmpty({ message: 'breed is required' })
  breed: string;
}

// class UpateCreateDto extends PartialType(CreateCatDto) {}  // 转为全部可选

// class UpateUpdateDto extends PickType(CreateCatDto, ['name']) {} // pick出给定的属性
//...

class UpdateCatDto {
  @IsNotEmpty({ message: 'name is required' })
  @IsString()
  name: string;
}

export { CreateCatDto, UpdateCatDto };
