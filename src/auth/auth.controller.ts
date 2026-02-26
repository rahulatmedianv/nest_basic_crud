import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseMessage } from 'src/common/decorator/response-message.decorator';
import { CreateUserDto, LoginDto } from './dta/users.dto';
// import { ControllerGuard } from 'src/common/guards/controller.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Request } from 'express';
import { UserEntity } from './auth.entity';

interface AuthRequest extends Request {
  user: UserEntity;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ResponseMessage('User Created Successfully')
  async signup(@Body() userInfo: CreateUserDto): Promise<any> {
    return await this.authService.signup(userInfo);
  }
  // @UseGuards(ControllerGuard)
  @Post('login')
  @ResponseMessage('User logged in successfully.') // interceptor
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return await this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ResponseMessage('User Profile Retrieved Successfully')
  profile(@Req() req: AuthRequest): Partial<UserEntity> {
    // const { user } = req;
    console.log({ user: req.user });
    // return await this.authService.profile(user);
    return req.user;
  }

  @Post('refresh')
  @ResponseMessage('Token Refreshed Successfully')
  refresh(@Body() bdy: { token: string }): any {
    const { token } = bdy;
    console.log({ token });
    return this.authService.refreshAccessToken(token);
  }
}
