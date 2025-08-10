import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tenant } from './database/entities/tenant.entity'
import { User } from './database/entities/user.entity'
import { Membership } from './database/entities/membership.entity'
import { InventoryItem } from './database/entities/inventory_item.entity'
import { ComplianceEvent } from './database/entities/compliance_event.entity'
import { DeliveryRoute } from './database/entities/delivery_route.entity'
import { InventoryController } from './inventory/inventory.controller'
import { InventoryService } from './inventory/inventory.service'
import { ComplianceController } from './compliance/compliance.controller'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { JwtGuard } from './common/guards/jwt.guard'
import { DeliveryController } from './delivery/delivery.controller'
import { HealthController } from './system/health.controller'
import { ReportsController } from './reports/reports.controller'
import { TenantResolver } from './common/tenant.util'

@Module({
  imports: [
    ThrottlerModule.forRoot({ throttlers: [{ ttl: 60_000, limit: 120 }] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'postgres',
      port: Number(process.env.POSTGRES_PORT || 5432),
      database: process.env.POSTGRES_DB || 'cannacomply',
      username: process.env.POSTGRES_USER || 'app',
      password: process.env.POSTGRES_PASSWORD || 'app_password',
      entities: [Tenant, User, Membership, InventoryItem, ComplianceEvent, DeliveryRoute],
      synchronize: true,
      logging: false,
    }),
    TypeOrmModule.forFeature([Tenant, User, Membership, InventoryItem, ComplianceEvent, DeliveryRoute]),
  ],
  controllers: [InventoryController, ComplianceController, DeliveryController, HealthController, ReportsController],
  providers: [
    InventoryService,
    TenantResolver,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtGuard },
  ],
})
export class AppModule {}


