import { Injectable, NestInterceptor, ExecutionContext, BadRequestException, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderCannotBeDeletedError } from '../errors/order-cannot-be-deleted.error';

@Injectable()
export class OrderCannotBeDeletedErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof OrderCannotBeDeletedError) {
          throw new BadRequestException(error.message);
        }

        throw error;
      }),
    );
  }
}
