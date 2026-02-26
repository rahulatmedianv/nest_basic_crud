import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsController } from './blogs/blogs.controller';
import { BlogService } from './blogs/blogs.service';
import configService from './config/configService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './blogs/blogs.entity';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([BlogEntity]),
    AuthModule,
  ],
  controllers: [AppController, BlogsController],
  providers: [ResponseInterceptor, AppService, BlogService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // global middleware
  }
}
