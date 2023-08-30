import { Injectable, NestInterceptor, ExecutionContext, BadRequestException, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderIsRefundedError } from '../errors/order-is-refunded.error';

@Injectable()
export class OrderIsRefundedErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof OrderIsRefundedError) {
          throw new BadRequestException(error.message);
        }

        throw error;
      }),
    );
  }
}
