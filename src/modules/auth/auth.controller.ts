import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from '~/common/decorators/public.decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() body: LoginDto): Promise<Record<string, any>> {
    return this.authService.login(body);
  }
}
