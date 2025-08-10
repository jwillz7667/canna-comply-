import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { logger } from '../logger'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request & { method: string; url: string }>()
    const start = Date.now()
    return next.handle().pipe(
      tap(() => {
        const ms = Date.now() - start
        logger.info({ method: req.method, url: req.url, durationMs: ms }, 'request')
      }),
    )
  }
}


