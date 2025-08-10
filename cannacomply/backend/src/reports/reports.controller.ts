import { Controller, Get, Query } from '@nestjs/common'

@Controller('reports')
export class ReportsController {
  @Get('revenue')
  revenue(@Query('range') range?: string) {
    const amount = range === '30d' ? 48210 : 12450
    return { amount }
  }
}
