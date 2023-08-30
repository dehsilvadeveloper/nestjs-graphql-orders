import { Injectable, NestInterceptor, ExecutionContext, GoneException, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreIsDeletedError } from '../errors/store-is-deleted.error';

@Injectable()
export class StoreIsDeletedErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof StoreIsDeletedError) {
          throw new GoneException(error.message);
        }

        throw error;
      }),
    );
  }
}
