import { Injectable, NestInterceptor, ExecutionContext, BadRequestException, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreCannotBeDeletedError } from '../errors/store-cannot-be-deleted.error';

@Injectable()
export class StoreCannotBeDeletedErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof StoreCannotBeDeletedError) {
          throw new BadRequestException(error.message);
        }

        throw error;
      }),
    );
  }
}
