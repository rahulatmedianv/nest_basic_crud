import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['warn', 'error', 'log'],
  });
  // app.useGlobalInterceptors(app.get(ResponseInterceptor));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(User));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
