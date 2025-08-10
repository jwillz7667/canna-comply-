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
exports.TenantResolver = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tenant_entity_1 = require("../database/entities/tenant.entity");
const common_1 = require("@nestjs/common");
let TenantResolver = class TenantResolver {
    constructor(tenantRepo) {
        this.tenantRepo = tenantRepo;
    }
    async resolveTenantId(request) {
        const header = request.headers?.['x-tenant'];
        const slug = Array.isArray(header) ? header[0] : (header || 'demo').toString();
        const existing = await this.tenantRepo.findOne({ where: { slug } });
        if (existing)
            return existing.id;
        const created = this.tenantRepo.create({ slug, name: slug, active: true });
        const saved = await this.tenantRepo.save(created);
        return saved.id;
    }
};
exports.TenantResolver = TenantResolver;
exports.TenantResolver = TenantResolver = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TenantResolver);
//# sourceMappingURL=tenant.util.js.map