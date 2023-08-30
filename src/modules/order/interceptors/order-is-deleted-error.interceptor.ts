import { Injectable, NestInterceptor, ExecutionContext, GoneException, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderIsDeletedError } from '../errors/order-is-deleted.error';

@Injectable()
export class OrderIsDeletedErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof OrderIsDeletedError) {
          throw new GoneException(error.message);
        }

        throw error;
      }),
    );
  }
}
