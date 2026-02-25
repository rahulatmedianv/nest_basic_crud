import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsController } from './blogs/blogs.controller';
import { BlogService } from './blogs/blogs.service';
import configService from './config/configService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './blogs/blogs.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([BlogEntity]),
  ],
  controllers: [AppController, BlogsController],
  providers: [AppService, BlogService],
})
export class AppModule {}
