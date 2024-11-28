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

class UpdateCatDto {
  @IsNotEmpty({ message: 'name is required' })
  @IsString()
  name: string;
}

export { CreateCatDto, UpdateCatDto };
