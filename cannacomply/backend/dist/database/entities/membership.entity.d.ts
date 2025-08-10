export type MembershipRole = 'OWNER' | 'MANAGER' | 'STAFF' | 'DRIVER';
export declare class Membership {
    id: number;
    userId: number;
    tenantId: number;
    role: MembershipRole;
    createdAt: Date;
    updatedAt: Date;
}
