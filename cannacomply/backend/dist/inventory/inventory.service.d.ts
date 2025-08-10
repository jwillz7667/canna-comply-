import { Repository } from 'typeorm';
import { InventoryItem } from '../database/entities/inventory_item.entity';
import { ComplianceEvent } from '../database/entities/compliance_event.entity';
export declare class InventoryService {
    private readonly inventoryRepo;
    private readonly complianceRepo;
    constructor(inventoryRepo: Repository<InventoryItem>, complianceRepo: Repository<ComplianceEvent>);
    list(limit?: number, tenantId?: number): Promise<{
        items: InventoryItem[];
    }>;
    sync(tenantId?: number): Promise<{
        ok: boolean;
    }>;
}
