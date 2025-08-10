"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inventory_item_entity_1 = require("../database/entities/inventory_item.entity");
const compliance_event_entity_1 = require("../database/entities/compliance_event.entity");
let InventoryService = class InventoryService {
    constructor(inventoryRepo, complianceRepo) {
        this.inventoryRepo = inventoryRepo;
        this.complianceRepo = complianceRepo;
    }
    async list(limit = 500, tenantId = 1) {
        const items = await this.inventoryRepo.find({
            where: { tenantId },
            order: { updatedAt: 'DESC' },
            take: limit,
        });
        return { items };
    }
    async sync(tenantId = 1) {
        const now = new Date();
        const upserts = [
            {
                sku: 'FLOW-OG-1',
                name: 'OG Flower 1/8 oz',
                batchId: null,
                qty: 42,
                expiresAt: null,
                status: 'ERROR',
            },
            {
                sku: 'GUMM-ML-10',
                name: 'Mixed Lemon Gummies 10pk',
                batchId: 'B-1002',
                qty: 13,
                expiresAt: new Date(now.getTime() - 24 * 3600 * 1000),
                status: 'WARN',
            },
            {
                sku: 'CART-OG-05',
                name: 'OG Vape Cart 0.5g',
                batchId: 'B-1003',
                qty: 120,
                expiresAt: null,
                status: 'OK',
            },
        ];
        for (const u of upserts) {
            let item = await this.inventoryRepo.findOne({ where: { sku: u.sku, tenantId } });
            if (!item) {
                item = this.inventoryRepo.create({ ...u, tenantId });
            }
            else {
                Object.assign(item, u);
            }
            await this.inventoryRepo.save(item);
        }
        await this.complianceRepo.save(this.complianceRepo.create({ tenantId, type: 'SYNC', payload: { count: upserts.length }, status: 'OK' }));
        return { ok: true };
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inventory_item_entity_1.InventoryItem)),
    __param(1, (0, typeorm_1.InjectRepository)(compliance_event_entity_1.ComplianceEvent)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map