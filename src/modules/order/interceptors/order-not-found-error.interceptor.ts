import { Injectable, NestInterceptor, ExecutionContext, NotFoundException, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderNotFoundError } from '../errors/order-not-found.error';

@Injectable()
export class OrderNotFoundErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof OrderNotFoundError) {
          throw new NotFoundException(error.message);
        }

        throw error;
      }),
    );
  }
}
