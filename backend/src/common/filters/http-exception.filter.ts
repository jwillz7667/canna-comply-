import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const message = (exception.getResponse() as any)?.message || exception.message

    response.status(status).json({
      ok: false,
      status,
      error: typeof message === 'string' ? message : Array.isArray(message) ? message.join(', ') : 'Error',
      path: request.url,
      timestamp: new Date().toISOString(),
    })
  }
}


