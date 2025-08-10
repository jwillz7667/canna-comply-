import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InventoryItem } from '../database/entities/inventory_item.entity'
import { ComplianceEvent } from '../database/entities/compliance_event.entity'

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryItem)
    private readonly inventoryRepo: Repository<InventoryItem>,
    @InjectRepository(ComplianceEvent)
    private readonly complianceRepo: Repository<ComplianceEvent>,
  ) {}

  async list(limit = 500, tenantId = 1) {
    const items = await this.inventoryRepo.find({
      where: { tenantId },
      order: { updatedAt: 'DESC' },
      take: limit,
    })
    return { items }
  }

  async sync(tenantId = 1) {
    const now = new Date()
    const upserts = [
      {
        sku: 'FLOW-OG-1',
        name: 'OG Flower 1/8 oz',
        batchId: null,
        qty: 42,
        expiresAt: null,
        status: 'ERROR' as const,
      },
      {
        sku: 'GUMM-ML-10',
        name: 'Mixed Lemon Gummies 10pk',
        batchId: 'B-1002',
        qty: 13,
        expiresAt: new Date(now.getTime() - 24 * 3600 * 1000),
        status: 'WARN' as const,
      },
      {
        sku: 'CART-OG-05',
        name: 'OG Vape Cart 0.5g',
        batchId: 'B-1003',
        qty: 120,
        expiresAt: null,
        status: 'OK' as const,
      },
    ]

    for (const u of upserts) {
      let item = await this.inventoryRepo.findOne({ where: { sku: u.sku, tenantId } })
      if (!item) {
        item = this.inventoryRepo.create({ ...u, tenantId })
      } else {
        Object.assign(item, u)
      }
      await this.inventoryRepo.save(item)
    }
    await this.complianceRepo.save(
      this.complianceRepo.create({ tenantId, type: 'SYNC', payload: { count: upserts.length }, status: 'OK' }),
    )
    return { ok: true }
  }
}
