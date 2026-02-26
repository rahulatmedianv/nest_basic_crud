import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private readonly reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('04 Global Interceptor | Response Interceptor');
    const message =
      this.reflector.get<string>('responseMessage', context.getHandler()) ||
      'Request successful';
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse<Response>();
        return {
          statusCode: response.statusCode,
          message,
          data: data ?? null,
          count: Array.isArray(data) ? data.length : undefined,
        };
      }),
    );
  }
}
