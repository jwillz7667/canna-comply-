import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import { ValidationPipe } from '@nestjs/common'
import { HttpErrorFilter } from './common/filters/http-exception.filter'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { Reflector } from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(helmet())

  const allowed = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000')
    .split(',')
    .map(s => s.trim())

  app.enableCors({
    origin: allowed,
    credentials: true,
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization','X-Tenant'],
    exposedHeaders: [],
  })

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.useGlobalFilters(new HttpErrorFilter())

  app.useGlobalInterceptors(new LoggingInterceptor())

  const port = Number(process.env.PORT || 4000)
  await app.listen(port)
  // use pino logger through interceptor; minimal startup line:
  process.stdout.write(`API listening on http://localhost:${port}\n`)
}

bootstrap()


