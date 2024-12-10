import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from '~/common/decorators/public.decorators';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({
    summary: '登陆',
    description: '登陆',
  })
  login(@Body() body: LoginDto): Promise<Record<string, any>> {
    return this.authService.login(body);
  }
}
