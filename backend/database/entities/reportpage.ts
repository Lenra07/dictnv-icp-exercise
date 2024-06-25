import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'reportpage',
})
export class ReportPage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  user: number;

  @Column({ type: 'text', unique: true })
  message: string;

  @Column({ type: 'text', unique: true })
  date_update: string;
}
