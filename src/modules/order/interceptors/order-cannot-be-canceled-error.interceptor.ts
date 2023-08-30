import { Injectable, NestInterceptor, ExecutionContext, BadRequestException, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderCannotBeCanceledError } from '../errors/order-cannot-be-canceled.error';

@Injectable()
export class OrderCannotBeCanceledErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof OrderCannotBeCanceledError) {
          throw new BadRequestException(error.message);
        }

        throw error;
      }),
    );
  }
}
