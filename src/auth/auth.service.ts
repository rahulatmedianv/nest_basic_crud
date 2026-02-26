import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './auth.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginDto } from './dta/users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenEntity } from './refreshToken.entity';

interface JwtPayload {
  id: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
    private jwtService: JwtService,
  ) {}

  async signup(dto: CreateUserDto): Promise<any> {
    const { username, email } = dto;
    const isUserNameExist = await this.userRepository.findOneBy({ username });
    if (isUserNameExist) {
      console.log({ isUserNameExist });
      throw new NotAcceptableException('User exist with the same username');
      //   return 'User exist with the same username';
    }
    const isEmailExist = await this.userRepository.findOneBy({ email });
    if (isEmailExist) {
      throw new NotAcceptableException('User Exist with the same email');
      //   return 'User Exist with the same email';
    }

    const user = this.userRepository.create(dto);
    return await this.userRepository.save(user);
  }

  async login(dto: LoginDto): Promise<any> {
    const { loginType, email, password, username } = dto;
    let user: UserEntity | null = null;
    let isValid: boolean | Promise<boolean> = false;
    if (loginType === 'email') {
      user = await this.userRepository.findOneBy({
        email,
      });
    } else if (loginType === 'username') {
      user = await this.userRepository.findOneBy({
        username,
      });
    }
    if (!user) {
      throw new BadRequestException('Invalid Username and Password');
    }
    isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      const token = this.generateToken({
        id: user.id,
        email: user.email,
      });
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);
      const tokenEntity = this.refreshTokenRepository.create({
        token: token.refreshToken,
        userId: user.id,
        expiresAt: expiresAt,
      });
      await this.refreshTokenRepository.save(tokenEntity);
      await this.saveRefreshToken(token.refreshToken, user.id);
      return { ...token, id: user.id, email: user.email, name: user.username };
    }
    throw new BadRequestException('Invalid Username and Password');
  }

  async saveRefreshToken(token: string, userId: string): Promise<any> {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
    const newRefreshToken = this.refreshTokenRepository.create({
      token,
      userId,
      expiresAt,
    });
    await this.refreshTokenRepository.save(newRefreshToken);
  }

  async profile(): Promise<any> {
    const user = await this.userRepository.findOneBy({ id: 'id' });
    return user;
  }

  generateToken(payload: any): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESS_TOKEN_SECRET,
      expiresIn: '1h',
    });
    return { accessToken, refreshToken };
  }

  async refreshAccessToken(token: string) {
    try {
      const decode = this.jwtService.decode<JwtPayload>(token);
      if (!decode) {
        throw new UnauthorizedException();
      }

      const tokenEntity = await this.refreshTokenRepository.findOne({
        where: { userId: decode.id },
      });

      if (!tokenEntity) {
        throw new UnauthorizedException();
      }

      // delete if expired;
      if (tokenEntity.expiresAt < new Date()) {
        await this.refreshTokenRepository.delete(tokenEntity.id);
        throw new UnauthorizedException('Refresh Token Expired');
      }

      await this.refreshTokenRepository.delete(tokenEntity.id);

      const newToken = this.generateToken({
        id: decode.id,
        email: decode.email,
      });

      await this.saveRefreshToken(newToken.refreshToken, decode.id);
      return newToken;

      // const decode = this.jwtService.verify<JwtPayload>(token, {
      //   secret: process.env.JWT_REFRESS_TOKEN_SECRET,
      // });
      // const newToken = this.generateToken({
      //   id: decode.id,
      //   email: decode.email,
      // });
      // console.log({ decode });
      // await this.saveRefreshToken(newToken.refreshToken, decode.id);
      // return newToken;
    } catch (error: unknown) {
      console.log({ error });
      throw new UnauthorizedException('invalid or expired token');
    }
  }

  //   async generateAccessToken(
  //     user: Partial<CreateUserDto>,
  //   ): Promise<{ accessToken: string }> {
  //     const accessToken = this.jwtService.sign({
  //       id: user.id,
  //       email: user.email,
  //     }, {

  //     });
  //   }
}
