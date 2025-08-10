import { Repository } from 'typeorm';
import { ComplianceEvent } from '../database/entities/compliance_event.entity';
import { TenantResolver } from '../common/tenant.util';
export declare class ComplianceController {
    private readonly complianceRepo;
    private readonly tenantResolver;
    constructor(complianceRepo: Repository<ComplianceEvent>, tenantResolver: TenantResolver);
    health(): {
        score: number;
    };
    alerts(limit?: string): {
        total: number;
        error: number;
        warn: number;
        items: ({
            id: string;
            code: string;
            severity: "ERROR";
            message: string;
            sku: string;
            quickFix: {
                label: string;
                endpoint: string;
            };
        } | {
            id: string;
            code: string;
            severity: "WARN";
            message: string;
            sku: string;
            quickFix: {
                label: string;
                endpoint: string;
            };
        } | {
            id: string;
            code: string;
            severity: "INFO";
            message: string;
            sku?: undefined;
            quickFix?: undefined;
        })[];
    };
    revalidate(req: any): Promise<{
        ok: boolean;
    }>;
    fix(id: string, req: any): Promise<{
        ok: boolean;
        id: string;
    }>;
}
