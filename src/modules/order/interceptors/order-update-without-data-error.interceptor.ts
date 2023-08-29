import { Injectable, NestInterceptor, ExecutionContext, BadRequestException, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderUpdateWithoutDataError } from '../errors/order-update-without-data.error';

@Injectable()
export class OrderUpdateWithoutDataErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof OrderUpdateWithoutDataError) {
          throw new BadRequestException(error.message);
        }

        throw error;
      }),
    );
  }
}
