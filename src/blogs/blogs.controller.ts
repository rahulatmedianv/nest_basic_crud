import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { BlogService } from './blogs.service';
import { CreateBlogsDto } from './dto/blogs.dto';
import type { Response } from 'express';
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  getHello(): string {
    return this.blogService.getHello();
  }

  @Post()
  create(@Body() data: CreateBlogsDto, @Res() res: Response): any {
    // return
    this.blogService.create(data);
    // return res.send(200).json({ message: 'Ok' });
    return res.status(HttpStatus.CREATED).json({ message: 'ok' });
  }
}
