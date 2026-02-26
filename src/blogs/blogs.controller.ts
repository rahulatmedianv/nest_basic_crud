import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blogs.service';
import { CreateBlogsDto } from './dto/blogs.dto';
import { ResponseMessage } from 'src/common/decorator/response-message.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @ResponseMessage('Blog Retrieved Successfully')
  getHello() {
    return this.blogService.getBlogs();
  }
  @UseGuards(AuthGuard)
  @Post()
  @ResponseMessage('Blog Saved Successfully')
  async create(@Body() data: CreateBlogsDto): Promise<any> {
    return await this.blogService.create(data);
  }

  @ResponseMessage('Blog Updated Successfully')
  @Put(':id')
  async update(@Body() updatedData: CreateBlogsDto, @Param('id') id: string) {
    return await this.blogService.updateBlog(updatedData, id);
  }

  @ResponseMessage('Blog Deleted Successfully')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.blogService.deleteBlog(id);
  }
}
