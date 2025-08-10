import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Tenant } from '../database/entities/tenant.entity'

export class TenantResolver {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepo: Repository<Tenant>,
  ) {}

  async resolveTenantId(request: { headers?: Record<string, string> }): Promise<number> {
    const slug = (request.headers?.['x-tenant'] || 'demo').toString()
    const existing = await this.tenantRepo.findOne({ where: { slug } })
    if (existing) return existing.id
    const created = this.tenantRepo.create({ slug, name: slug, active: true })
    const saved = await this.tenantRepo.save(created)
    return saved.id
  }
}


