import { Repository } from 'typeorm';
import { Tenant } from '../database/entities/tenant.entity';
export declare class TenantResolver {
    private readonly tenantRepo;
    constructor(tenantRepo: Repository<Tenant>);
    resolveTenantId(request: {
        headers?: Record<string, string | string[] | undefined>;
    }): Promise<number>;
}
