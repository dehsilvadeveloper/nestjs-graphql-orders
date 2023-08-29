import { Injectable, NestInterceptor, ExecutionContext, BadRequestException, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreUpdateWithoutDataError } from '../errors/store-update-without-data.error';

@Injectable()
export class StoreUpdateWithoutDataErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof StoreUpdateWithoutDataError) {
          throw new BadRequestException(error.message);
        }

        throw error;
      }),
    );
  }
}
