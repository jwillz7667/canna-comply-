import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export type MembershipRole = 'OWNER' | 'MANAGER' | 'STAFF' | 'DRIVER'

@Entity({ name: 'memberships' })
@Index(['userId', 'tenantId'], { unique: true })
export class Membership {
  @PrimaryGeneratedColumn()
  id!: number

  @Index()
  @Column({ type: 'int' })
  userId!: number

  @Index()
  @Column({ type: 'int' })
  tenantId!: number

  @Column({ type: 'varchar' })
  role!: MembershipRole

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
