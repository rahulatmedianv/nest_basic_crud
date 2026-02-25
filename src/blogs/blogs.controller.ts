import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { BlogService } from './blogs.service';
import { CreateBlogsDto } from './dto/blogs.dto';
import type { Response } from 'express';
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  getHello() {
    return this.blogService.getBlogs();
  }

  @Post()
  async create(
    @Body() data: CreateBlogsDto,
    @Res() res: Response,
  ): Promise<any> {
    await this.blogService.create(data);
    return res.status(HttpStatus.CREATED).json({ message: 'ok' });
  }
}
