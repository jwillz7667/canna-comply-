import { Controller, Get } from '@nestjs/common'
import { DataSource } from 'typeorm'

@Controller('health')
export class HealthController {
  constructor(private readonly dataSource: DataSource) {}

  @Get()
  async check() {
    try {
      await this.dataSource.query('SELECT 1')
      return { ok: true, db: 'up' }
    } catch (e) {
      return { ok: false, db: 'down' }
    }
  }
}


