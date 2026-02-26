import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseMessage } from 'src/common/decorator/response-message.decorator';
import { CreateUserDto, LoginDto } from './dta/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ResponseMessage('User Created Successfullly')
  async signup(@Body() userInfo: CreateUserDto): Promise<any> {
    return await this.authService.signup(userInfo);
  }

  @Post('login')
  @ResponseMessage('User loged in successfully.')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return await this.authService.login(loginDto);
  }
}
