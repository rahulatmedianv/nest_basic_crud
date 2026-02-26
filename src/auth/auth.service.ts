import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './auth.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginDto } from './dta/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
    console.log({ dto });
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
      return user;
    }
    throw new BadRequestException('Invalid Username and Password');
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
