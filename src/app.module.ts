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
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalGuard } from './common/guards/global.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([BlogEntity]),
    AuthModule,
  ],
  controllers: [AppController, BlogsController],
  providers: [
    AppService,
    BlogService,
    // { provide: APP_GUARD, useClass: GlobalGuard },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // global middleware 0(this will always run first in the request lifecycle)
  }
}
