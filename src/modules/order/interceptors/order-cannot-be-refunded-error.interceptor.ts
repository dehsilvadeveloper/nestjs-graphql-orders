import { Injectable, NestInterceptor, ExecutionContext, BadRequestException, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderCannotBeRefundedError } from '../errors/order-cannot-be-refunded.error';

@Injectable()
export class OrderCannotBeRefundedErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof OrderCannotBeRefundedError) {
          throw new BadRequestException(error.message);
        }

        throw error;
      }),
    );
  }
}
