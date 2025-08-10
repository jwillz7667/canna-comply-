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
exports.DeliveryController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const delivery_route_entity_1 = require("../database/entities/delivery_route.entity");
const tenant_util_1 = require("../common/tenant.util");
let DeliveryController = class DeliveryController {
    constructor(routesRepo, tenantResolver) {
        this.routesRepo = routesRepo;
        this.tenantResolver = tenantResolver;
    }
    async getRoutes(req) {
        const tenantId = await this.tenantResolver.resolveTenantId(req);
        const items = await this.routesRepo.find({ where: { tenantId }, order: { createdAt: 'DESC' } });
        return { items: items.map(r => ({ id: r.routeCode, stops: r.stops, durationMinutes: r.durationMinutes, driverLink: r.driverLink })) };
    }
    async createRoute(req) {
        const tenantId = await this.tenantResolver.resolveTenantId(req);
        const id = String(Math.floor(Math.random() * 9000) + 1000);
        const entity = this.routesRepo.create({
            tenantId,
            routeCode: id,
            stops: Math.floor(Math.random() * 6) + 3,
            durationMinutes: Math.floor(Math.random() * 120) + 30,
            driverLink: `https://example.com/route/${id}`,
        });
        const saved = await this.routesRepo.save(entity);
        return { id: saved.routeCode, stops: saved.stops, durationMinutes: saved.durationMinutes, driverLink: saved.driverLink };
    }
    async summaryToday(req) {
        const tenantId = await this.tenantResolver.resolveTenantId(req);
        const count = await this.routesRepo.count({ where: { tenantId } });
        return { totalRoutes: count, completed: Math.floor(count / 2) };
    }
};
exports.DeliveryController = DeliveryController;
__decorate([
    (0, common_1.Get)('routes'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "getRoutes", null);
__decorate([
    (0, common_1.Post)('routes'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "createRoute", null);
__decorate([
    (0, common_1.Get)('summary/today'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "summaryToday", null);
exports.DeliveryController = DeliveryController = __decorate([
    (0, common_1.Controller)('delivery'),
    __param(0, (0, typeorm_1.InjectRepository)(delivery_route_entity_1.DeliveryRoute)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        tenant_util_1.TenantResolver])
], DeliveryController);
//# sourceMappingURL=delivery.controller.js.map