import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity({ name: 'delivery_routes' })
@Unique('UQ_tenant_route_code', ['tenantId', 'routeCode'])
export class DeliveryRoute {
  @PrimaryGeneratedColumn()
  id!: number

  @Index()
  @Column()
  tenantId!: number

  @Index()
  @Column({ type: 'varchar' })
  routeCode!: string

  @Column({ type: 'int' })
  stops!: number

  @Column({ type: 'int' })
  durationMinutes!: number

  @Column({ type: 'varchar' })
  driverLink!: string

  @CreateDateColumn()
  createdAt!: Date
}
