import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: '用户邮箱', example: '1121592239@qq.com' })
  email: string;

  @ApiProperty({ description: '用户密码', example: '123456' })
  @IsNotEmpty()
  password: string;
}

export { LoginDto };
