import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common'
import { InventoryService } from './inventory.service'
import { JwtGuard } from '../common/guards/jwt.guard'
import { TenantResolver } from '../common/tenant.util'

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventory: InventoryService, private readonly tenantResolver: TenantResolver) {}

  @Get('list')
  async list(@Query('limit') limit?: string, @Req() req?: any) {
    const nRaw = Number(limit)
    const n = Number.isFinite(nRaw) ? Math.min(Math.max(nRaw, 1), 1000) : 500
    const tenantId = await this.tenantResolver.resolveTenantId(req)
    return this.inventory.list(n, tenantId)
  }

  @UseGuards(JwtGuard)
  @Post('sync')
  async sync(@Req() req?: any) {
    const tenantId = await this.tenantResolver.resolveTenantId(req)
    return this.inventory.sync(tenantId)
  }
}


