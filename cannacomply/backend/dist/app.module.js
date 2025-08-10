"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tenant_entity_1 = require("./database/entities/tenant.entity");
const user_entity_1 = require("./database/entities/user.entity");
const membership_entity_1 = require("./database/entities/membership.entity");
const inventory_item_entity_1 = require("./database/entities/inventory_item.entity");
const compliance_event_entity_1 = require("./database/entities/compliance_event.entity");
const delivery_route_entity_1 = require("./database/entities/delivery_route.entity");
const inventory_controller_1 = require("./inventory/inventory.controller");
const inventory_service_1 = require("./inventory/inventory.service");
const compliance_controller_1 = require("./compliance/compliance.controller");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const jwt_guard_1 = require("./common/guards/jwt.guard");
const delivery_controller_1 = require("./delivery/delivery.controller");
const health_controller_1 = require("./system/health.controller");
const reports_controller_1 = require("./reports/reports.controller");
const tenant_util_1 = require("./common/tenant.util");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRoot({ throttlers: [{ ttl: 60_000, limit: 120 }] }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.POSTGRES_HOST || 'postgres',
                port: Number(process.env.POSTGRES_PORT || 5432),
                database: process.env.POSTGRES_DB || 'cannacomply',
                username: process.env.POSTGRES_USER || 'app',
                password: process.env.POSTGRES_PASSWORD || 'app_password',
                entities: [tenant_entity_1.Tenant, user_entity_1.User, membership_entity_1.Membership, inventory_item_entity_1.InventoryItem, compliance_event_entity_1.ComplianceEvent, delivery_route_entity_1.DeliveryRoute],
                synchronize: true,
                logging: false,
            }),
            typeorm_1.TypeOrmModule.forFeature([tenant_entity_1.Tenant, user_entity_1.User, membership_entity_1.Membership, inventory_item_entity_1.InventoryItem, compliance_event_entity_1.ComplianceEvent, delivery_route_entity_1.DeliveryRoute]),
        ],
        controllers: [inventory_controller_1.InventoryController, compliance_controller_1.ComplianceController, delivery_controller_1.DeliveryController, health_controller_1.HealthController, reports_controller_1.ReportsController],
        providers: [
            inventory_service_1.InventoryService,
            tenant_util_1.TenantResolver,
            { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard },
            { provide: core_1.APP_GUARD, useClass: jwt_guard_1.JwtGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map