import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class ResponseFormat<T> {
  @ApiProperty()
  isArray: boolean;
  @ApiProperty()
  path: string;
  @ApiProperty()
  duration: string;
  @ApiProperty()
  method: string;
  @ApiProperty()
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  data: T | T[];
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    return next.handle().pipe(
      map((data) => {
        const base = {
          path: request.path,
          duration: `${Date.now() - now}ms`,
          method: request.method,
        };

        // If response already has `data` and `meta`, return it as-is (paginated)
        if (data && typeof data === 'object' && 'data' in data && 'meta' in data) {
          return {
            ...data,
            ...base,
          };
        }

        // Else: normal response
        return {
          data,
          isArray: Array.isArray(data),
          ...base,
        };
      }),
    );
  }
}
