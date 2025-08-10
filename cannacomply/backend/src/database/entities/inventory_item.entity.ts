import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export type InventoryStatus = 'OK' | 'WARN' | 'ERROR'

@Entity({ name: 'inventory_items' })
@Index(['tenantId', 'sku'], { unique: true })
export class InventoryItem {
  @PrimaryGeneratedColumn()
  id!: number

  @Index()
  @Column({ type: 'int' })
  tenantId!: number

  @Index()
  @Column({ type: 'varchar' })
  sku!: string

  @Column({ type: 'varchar' })
  name!: string

  @Column({ type: 'varchar', nullable: true })
  batchId!: string | null

  @Column({ type: 'int' })
  qty!: number

  @Column({ type: 'timestamptz', nullable: true })
  expiresAt!: Date | null

  @Column({ type: 'varchar' })
  status!: InventoryStatus

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
