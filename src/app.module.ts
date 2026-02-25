import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsController } from './blogs/blogs.controller';
import { BlogService } from './blogs/blogs.service';
import configService from './config/configService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './blogs/blogs.entity';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([BlogEntity]),
  ],
  controllers: [AppController, BlogsController],
  providers: [ResponseInterceptor, AppService, BlogService],
})
export class AppModule {}
