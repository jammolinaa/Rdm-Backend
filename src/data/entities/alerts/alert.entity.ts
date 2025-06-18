import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Device } from 'src/data/entities/devices/device.entity';
import { Condition } from 'src/data/entities/conditions/condition.entity';

@Entity('alerts')
export class Alert {
  @PrimaryGeneratedColumn()
  alerts_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Device, (device)=> device.alerts, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'device_id' })
  device: Device;

  @ManyToOne (() => Condition, (alert) => alert.condition, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'condition_id' })
  condition: Condition;

  @Column('float')
  value: number;

  @Column()
  unit_time: string;

  @Column()
  time: string;

  @Column('int')
  count: number;

  @Column()
  days: string;

  @Column()
  hour_start: string;

  @Column()
  hour_finish: string;

  @Column({ default: true })
  state: boolean;
}
