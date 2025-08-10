import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

export type ComplianceType = 'SYNC' | 'VALIDATION' | 'SUBMISSION'
export type ComplianceStatus = 'OK' | 'WARN' | 'ERROR'

@Entity({ name: 'compliance_events' })
export class ComplianceEvent {
  @PrimaryGeneratedColumn()
  id!: number

  @Index()
  @Column({ type: 'int' })
  tenantId!: number

  @Column({ type: 'varchar' })
  type!: ComplianceType

  @Column({ type: 'jsonb', nullable: true })
  payload!: Record<string, unknown> | null

  @Column({ type: 'varchar' })
  status!: ComplianceStatus

  @CreateDateColumn()
  createdAt!: Date
}
