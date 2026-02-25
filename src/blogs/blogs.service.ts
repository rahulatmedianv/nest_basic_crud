import { Injectable } from '@nestjs/common';
import { CreateBlogsDto } from './dto/blogs.dto';
import { BlogEntity } from './blogs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogEntity: Repository<BlogEntity>,
  ) {}
  getHello(): string {
    return 'Blog retrieved';
  }

  async create(createBlogDto: CreateBlogsDto) {
    const { title, body, author, date, description } = createBlogDto;
    console.log({ title, body, author, date, description });
    const blog = this.blogEntity.create(createBlogDto);
    await this.blogEntity.save(blog);
    return 'ok';
  }

  getBlogs() {
    const blogs = this.blogEntity.find();
    return blogs;
  }
}
