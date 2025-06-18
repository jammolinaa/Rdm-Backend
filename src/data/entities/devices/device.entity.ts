import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Schedule } from '../schedules/schedule.entity';
import { Source } from '../sources/source.entity';
import { SystemDevice } from '../system_device/system_device.entity';
import { Alert } from '../alerts/alert.entity';
import { LastValue } from '../last_value/last_value.entity';

@Entity('device')
export class Device {
  @PrimaryGeneratedColumn()
  device_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => Source, (source) => source.devices, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'sources_id' })
  source: Source;

  @ManyToOne(() => SystemDevice, (systemDevice) => systemDevice.devices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'system_device_id' })
  systemDevice: SystemDevice;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

  @Column({ type: 'json' })
  communication_route: Record<string, any>;

  @Column({ type: 'json' })
  event: Record<string, any>;

  @Column()
  user_id: number;

  @OneToMany(() => Schedule, (schedule) => schedule.device, {onDelete: 'CASCADE'})
  schedules: Array<Schedule>;
 
  @OneToMany(() => Alert, (alerts) => alerts.device, { onDelete: 'CASCADE' })
  alerts: Array<Alert>;

  @OneToMany(() => LastValue, (lastValue) => lastValue.device, {onDelete: 'CASCADE'})
  lastValue: Array<LastValue>;
}
