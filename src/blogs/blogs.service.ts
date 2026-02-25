import { Injectable } from '@nestjs/common';
import { CreateBlogsDto } from './dto/blogs.dto';
import { BlogEntity } from './blogs.entity';

@Injectable()
export class BlogService {
  getHello(): string {
    return 'Blog retrieved';
  }

  create(createBlogDto: CreateBlogsDto): string {
    const { title, body, author, date, description } = createBlogDto;
    console.log({ title, body, author, date, description });
    return 'ok';
  }
}
