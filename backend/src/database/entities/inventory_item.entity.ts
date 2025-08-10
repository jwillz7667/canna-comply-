import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn, Unique } from 'typeorm'

export type InventoryStatus = 'OK' | 'WARN' | 'ERROR'

@Entity({ name: 'inventory_items' })
@Unique('UQ_tenant_sku', ['tenantId', 'sku'])
export class InventoryItem {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  tenantId!: number

  @Index()
  @Column()
  sku!: string

  @Column()
  name!: string

  @Column({ type: 'varchar', nullable: true })
  batchId!: string | null

  @Column({ type: 'int', default: 0 })
  qty!: number

  @Column({ type: 'timestamptz', nullable: true })
  expiresAt!: Date | null

  @Column({ type: 'varchar', default: 'OK' })
  status!: InventoryStatus

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}


