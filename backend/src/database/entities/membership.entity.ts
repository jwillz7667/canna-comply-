import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export type Role = 'OWNER' | 'MANAGER' | 'STAFF' | 'DRIVER'

@Entity({ name: 'memberships' })
export class Membership {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  userId!: number

  @Column()
  tenantId!: number

  @Column({ type: 'varchar' })
  role!: Role

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}


