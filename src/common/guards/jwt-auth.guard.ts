import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { UserEntity } from 'src/auth/auth.entity';
import { Repository } from 'typeorm';

export interface jwtTokenInterface {
  id: string;
  username: string;
  email: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<Request>();
      const { authorization } = request.headers;
      const token = authorization?.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Invalid token format');
      }
      const payload = await this.jwtService.verifyAsync<jwtTokenInterface>(
        token,
        {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        },
      );
      const { id } = payload;
      const user = await this.userRepository.findOneBy({ id });
      request['user'] = user;
      return true;
    } catch (error: any) {
      console.log({ error });
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
