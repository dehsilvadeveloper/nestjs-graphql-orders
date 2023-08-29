import { Injectable, NestInterceptor, ExecutionContext, NotFoundException, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreNotFoundError } from '../errors/store-not-found.error';

@Injectable()
export class StoreNotFoundErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof StoreNotFoundError) {
          throw new NotFoundException(error.message);
        }

        throw error;
      }),
    );
  }
}
