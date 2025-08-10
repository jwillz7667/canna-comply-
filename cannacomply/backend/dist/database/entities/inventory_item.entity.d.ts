export type InventoryStatus = 'OK' | 'WARN' | 'ERROR';
export declare class InventoryItem {
    id: number;
    tenantId: number;
    sku: string;
    name: string;
    batchId: string | null;
    qty: number;
    expiresAt: Date | null;
    status: InventoryStatus;
    createdAt: Date;
    updatedAt: Date;
}
