import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'tenants' })
export class Tenant {
  @PrimaryGeneratedColumn()
  id!: number

  @Index({ unique: true })
  @Column({ type: 'varchar' })
  slug!: string

  @Column({ type: 'varchar' })
  name!: string

  @Column({ type: 'boolean', default: true })
  active!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
