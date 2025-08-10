import { Controller, Get, Post } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DeliveryRoute } from '../database/entities/delivery_route.entity'

@Controller('delivery')
export class DeliveryController {
  constructor(
    @InjectRepository(DeliveryRoute)
    private readonly routesRepo: Repository<DeliveryRoute>,
  ) {}

  @Get('routes')
  async getRoutes() {
    const items = await this.routesRepo.find({ where: { tenantId: 1 }, order: { createdAt: 'DESC' } })
    return { items: items.map(r => ({ id: r.routeCode, stops: r.stops, durationMinutes: r.durationMinutes, driverLink: r.driverLink })) }
  }

  @Post('routes')
  async createRoute() {
    const id = String(Math.floor(Math.random() * 9000) + 1000)
    const entity = this.routesRepo.create({
      tenantId: 1,
      routeCode: id,
      stops: Math.floor(Math.random() * 6) + 3,
      durationMinutes: Math.floor(Math.random() * 120) + 30,
      driverLink: `https://example.com/route/${id}`,
    })
    const saved = await this.routesRepo.save(entity)
    return { id: saved.routeCode, stops: saved.stops, durationMinutes: saved.durationMinutes, driverLink: saved.driverLink }
  }

  @Get('summary/today')
  async summaryToday() {
    const count = await this.routesRepo.count({ where: { tenantId: 1 } })
    return { totalRoutes: count, completed: Math.floor(count / 2) }
  }
}


