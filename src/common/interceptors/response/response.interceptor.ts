import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {

    const httpContext = context.switchToHttp()
    const response: Response = httpContext.getResponse()
    const status = response.statusCode

    return next.handle().pipe(
      map(data => {
        if (status === 204 || status === 304) {
          return data
        }
        
        if (data && data.meta && Array.isArray(data.data)) {
          return data;
        }
        return { data: data };
      }),
    );
  }
}