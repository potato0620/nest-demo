import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCatDto {
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsNotEmpty({ message: 'age is required' })
  @IsNumber({}, { message: 'age must be a number' })
  age: number;

  @IsNotEmpty({ message: 'breed is required' })
  breed: string;
}
