import { Repository } from 'typeorm';
import { DeliveryRoute } from '../database/entities/delivery_route.entity';
import { TenantResolver } from '../common/tenant.util';
export declare class DeliveryController {
    private readonly routesRepo;
    private readonly tenantResolver;
    constructor(routesRepo: Repository<DeliveryRoute>, tenantResolver: TenantResolver);
    getRoutes(req: any): Promise<{
        items: {
            id: string;
            stops: number;
            durationMinutes: number;
            driverLink: string;
        }[];
    }>;
    createRoute(req: any): Promise<{
        id: string;
        stops: number;
        durationMinutes: number;
        driverLink: string;
    }>;
    summaryToday(req: any): Promise<{
        totalRoutes: number;
        completed: number;
    }>;
}
