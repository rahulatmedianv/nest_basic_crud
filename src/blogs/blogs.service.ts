import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(dto: CreateBlogsDto) {
    const blog = this.blogEntity.create(dto);
    await this.blogEntity.save(blog);
    return 'ok';
  }

  getBlogs() {
    const blogs = this.blogEntity.find();
    return blogs;
  }

  async updateBlog(dto: CreateBlogsDto, id: string) {
    const blog = await this.blogEntity.findOneBy({ id });
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    Object.assign(blog, dto);
    return this.blogEntity.save(blog);
  }

  async deleteBlog(id: string) {
    const response = await this.blogEntity.delete({ id });
    return response;
  }
}
