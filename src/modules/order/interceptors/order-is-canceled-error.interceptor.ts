import { Injectable, NestInterceptor, ExecutionContext, BadRequestException, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderIsCanceledError } from '../errors/order-is-canceled.error';

@Injectable()
export class OrderIsCanceledErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof OrderIsCanceledError) {
          throw new BadRequestException(error.message);
        }

        throw error;
      }),
    );
  }
}
