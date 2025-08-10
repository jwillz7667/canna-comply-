import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

export type ComplianceType = 'SYNC' | 'VALIDATION' | 'SUBMISSION'
export type ComplianceStatus = 'OK' | 'WARN' | 'ERROR'

@Entity({ name: 'compliance_events' })
export class ComplianceEvent {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  tenantId!: number

  @Column({ type: 'varchar' })
  type!: ComplianceType

  @Column({ type: 'jsonb', default: {} })
  payload!: Record<string, any>

  @Column({ type: 'varchar', default: 'OK' })
  status!: ComplianceStatus

  @CreateDateColumn()
  createdAt!: Date
}


