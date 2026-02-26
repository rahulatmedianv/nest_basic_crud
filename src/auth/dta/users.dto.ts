import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsStrongPassword,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsIn(['email', 'username'])
  loginType: 'email' | 'username';

  @ValidateIf((o) => o.loginType === 'username')
  @IsNotEmpty()
  username?: string;

  @ValidateIf((o) => o.loginType === 'email')
  @IsEmail()
  email?: string;
}
