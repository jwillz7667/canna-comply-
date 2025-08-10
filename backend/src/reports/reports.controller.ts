import { Controller, Get, Query } from '@nestjs/common'

@Controller('reports')
export class ReportsController {
  @Get('revenue')
  revenue(@Query('range') range?: string) {
    // Demo numbers; range could be 7d, 30d, etc.
    const amount = range === '30d' ? 48210 : 12450
    return { amount }
  }
}


