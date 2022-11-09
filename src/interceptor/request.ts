import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
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
          throw new HttpException(
            {
              status: 'Bad Request',
              message:
                'Client sent an invalid request, such as lacking required request body or parameter.',
            },
            HttpStatus.BAD_REQUEST,
          );
        }
        return data;
      }),
    );
    // if (contentType !== 'application/json') {
    //    console.log(contentType);
    //    return next
    //      .handle()
    //      .pipe(
    //         catchError(err =>
    //           throwError(
    //             () =>
    //               new HttpException(
    //                 'Exception interceptor message',
    //                 HttpStatus.BAD_GATEWAY,
    //               ),
    //           ),
    //         )
    //      );
    // }
  }
}
