import { Controller, Get, Post, Param, Query, UseGuards, Req } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ComplianceEvent } from '../database/entities/compliance_event.entity'
import { JwtGuard } from '../common/guards/jwt.guard'
import { TenantResolver } from '../common/tenant.util'

@Controller('compliance')
export class ComplianceController {
  constructor(
    @InjectRepository(ComplianceEvent)
    private readonly complianceRepo: Repository<ComplianceEvent>,
    private readonly tenantResolver: TenantResolver,
  ) {}
  @Get('health')
  health() {
    return { score: 78 }
  }

  @Get('alerts')
  alerts(@Query('limit') limit?: string) {
    const items = [
      { id: 'A-001', code: 'INV_MISSING_BATCH', severity: 'ERROR' as const, message: 'Inventory item FLOW-OG-1 missing batch ID', sku: 'FLOW-OG-1', quickFix: { label: 'Add Batch', endpoint: '/compliance/fix/A-001' } },
      { id: 'A-002', code: 'INV_EXPIRED', severity: 'WARN' as const, message: 'GUMM-ML-10 expired', sku: 'GUMM-ML-10', quickFix: { label: 'Archive', endpoint: '/compliance/fix/A-002' } },
      { id: 'A-003', code: 'INFO_SAMPLE', severity: 'INFO' as const, message: 'Info level sample alert' },
    ]
    const nRaw = Number(limit)
    const n = Number.isFinite(nRaw) ? Math.min(Math.max(nRaw, 1), items.length) : items.length
    const capped = items.slice(0, n)
    return { total: items.length, error: 1, warn: 1, items: capped }
  }

  @UseGuards(JwtGuard)
  @Post('revalidate')
  async revalidate(@Req() req: any) {
    const tenantId = await this.tenantResolver.resolveTenantId(req)
    await this.complianceRepo.save(
      this.complianceRepo.create({ tenantId, type: 'VALIDATION', payload: { triggered: true }, status: 'OK' }),
    )
    return { ok: true }
  }

  @UseGuards(JwtGuard)
  @Post('fix/:id')
  async fix(@Param('id') id: string, @Req() req: any) {
    const tenantId = await this.tenantResolver.resolveTenantId(req)
    await this.complianceRepo.save(
      this.complianceRepo.create({ tenantId, type: 'SUBMISSION', payload: { fixId: id }, status: 'OK' }),
    )
    return { ok: true, id }
  }
}


