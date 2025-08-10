export type ComplianceType = 'SYNC' | 'VALIDATION' | 'SUBMISSION';
export type ComplianceStatus = 'OK' | 'WARN' | 'ERROR';
export declare class ComplianceEvent {
    id: number;
    tenantId: number;
    type: ComplianceType;
    payload: Record<string, unknown> | null;
    status: ComplianceStatus;
    createdAt: Date;
}
