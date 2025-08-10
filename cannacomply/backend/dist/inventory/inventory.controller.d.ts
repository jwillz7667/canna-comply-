import { InventoryService } from './inventory.service';
import { TenantResolver } from '../common/tenant.util';
export declare class InventoryController {
    private readonly inventory;
    private readonly tenantResolver;
    constructor(inventory: InventoryService, tenantResolver: TenantResolver);
    list(limit?: string, req?: any): Promise<{
        items: import("../database/entities/inventory_item.entity").InventoryItem[];
    }>;
    sync(req?: any): Promise<{
        ok: boolean;
    }>;
}
