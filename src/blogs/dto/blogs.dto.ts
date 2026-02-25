import { IsNotEmpty } from 'class-validator';

export class CreateBlogsDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  body: string;
}
