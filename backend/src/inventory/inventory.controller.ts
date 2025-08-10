import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common'
import { InventoryService } from './inventory.service'
import { JwtGuard } from '../common/guards/jwt.guard'

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventory: InventoryService) {}

  @Get('list')
  async list(@Query('limit') limit?: string, @Req() req?: any) {
    const n = Math.min(Number(limit || 500) || 500, 1000)
    return this.inventory.list(n, req?.headers['x-tenant'] || 'demo')
  }

  @UseGuards(JwtGuard)
  @Post('sync')
  async sync(@Req() req?: any) {
    return this.inventory.sync(req?.headers['x-tenant'] || 'demo')
  }
}


