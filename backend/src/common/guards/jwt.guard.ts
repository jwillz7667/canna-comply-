import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import jwt from 'jsonwebtoken'

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<any>()
    const auth = req.headers['authorization'] as string | undefined
    if (!auth) return true // demo: allow anonymous but parse if present
    const token = auth.replace(/^Bearer\s+/i, '')
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'change_me', {
        issuer: process.env.JWT_ISSUER || 'cannacomply',
        audience: process.env.JWT_AUDIENCE || 'cannacomply-web',
      })
      req.user = payload
    } catch {
      return false
    }
    return true
  }
}


