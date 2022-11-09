import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const contentType = request.headers['content-type'];

    return next.handle().pipe(
      map((data) => {
        if (contentType !== 'application/json') {
          throw new BadRequestException();
        }
        return data;
      }),
    );
  }
}
