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
exports.ComplianceController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const compliance_event_entity_1 = require("../database/entities/compliance_event.entity");
const jwt_guard_1 = require("../common/guards/jwt.guard");
const tenant_util_1 = require("../common/tenant.util");
let ComplianceController = class ComplianceController {
    constructor(complianceRepo, tenantResolver) {
        this.complianceRepo = complianceRepo;
        this.tenantResolver = tenantResolver;
    }
    health() {
        return { score: 78 };
    }
    alerts(limit) {
        const items = [
            { id: 'A-001', code: 'INV_MISSING_BATCH', severity: 'ERROR', message: 'Inventory item FLOW-OG-1 missing batch ID', sku: 'FLOW-OG-1', quickFix: { label: 'Add Batch', endpoint: '/compliance/fix/A-001' } },
            { id: 'A-002', code: 'INV_EXPIRED', severity: 'WARN', message: 'GUMM-ML-10 expired', sku: 'GUMM-ML-10', quickFix: { label: 'Archive', endpoint: '/compliance/fix/A-002' } },
            { id: 'A-003', code: 'INFO_SAMPLE', severity: 'INFO', message: 'Info level sample alert' },
        ];
        const nRaw = Number(limit);
        const n = Number.isFinite(nRaw) ? Math.min(Math.max(nRaw, 1), items.length) : items.length;
        const capped = items.slice(0, n);
        return { total: items.length, error: 1, warn: 1, items: capped };
    }
    async revalidate(req) {
        const tenantId = await this.tenantResolver.resolveTenantId(req);
        await this.complianceRepo.save(this.complianceRepo.create({ tenantId, type: 'VALIDATION', payload: { triggered: true }, status: 'OK' }));
        return { ok: true };
    }
    async fix(id, req) {
        const tenantId = await this.tenantResolver.resolveTenantId(req);
        await this.complianceRepo.save(this.complianceRepo.create({ tenantId, type: 'SUBMISSION', payload: { fixId: id }, status: 'OK' }));
        return { ok: true, id };
    }
};
exports.ComplianceController = ComplianceController;
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ComplianceController.prototype, "health", null);
__decorate([
    (0, common_1.Get)('alerts'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComplianceController.prototype, "alerts", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)('revalidate'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComplianceController.prototype, "revalidate", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)('fix/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ComplianceController.prototype, "fix", null);
exports.ComplianceController = ComplianceController = __decorate([
    (0, common_1.Controller)('compliance'),
    __param(0, (0, typeorm_1.InjectRepository)(compliance_event_entity_1.ComplianceEvent)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        tenant_util_1.TenantResolver])
], ComplianceController);
//# sourceMappingURL=compliance.controller.js.map