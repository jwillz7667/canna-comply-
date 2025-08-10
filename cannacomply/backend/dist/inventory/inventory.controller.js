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
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const inventory_service_1 = require("./inventory.service");
const jwt_guard_1 = require("../common/guards/jwt.guard");
const tenant_util_1 = require("../common/tenant.util");
let InventoryController = class InventoryController {
    constructor(inventory, tenantResolver) {
        this.inventory = inventory;
        this.tenantResolver = tenantResolver;
    }
    async list(limit, req) {
        const nRaw = Number(limit);
        const n = Number.isFinite(nRaw) ? Math.min(Math.max(nRaw, 1), 1000) : 500;
        const tenantId = await this.tenantResolver.resolveTenantId(req);
        return this.inventory.list(n, tenantId);
    }
    async sync(req) {
        const tenantId = await this.tenantResolver.resolveTenantId(req);
        return this.inventory.sync(tenantId);
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "list", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)('sync'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "sync", null);
exports.InventoryController = InventoryController = __decorate([
    (0, common_1.Controller)('inventory'),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService, tenant_util_1.TenantResolver])
], InventoryController);
//# sourceMappingURL=inventory.controller.js.map