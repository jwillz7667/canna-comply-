import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'tenants' })
export class Tenant {
  @PrimaryGeneratedColumn()
  id!: number

  @Index({ unique: true })
  @Column({ unique: true })
  slug!: string

  @Index()
  @Column()
  name!: string

  @Column({ default: true })
  active!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}


