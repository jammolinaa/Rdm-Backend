import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Schedule } from '../schedules/schedule.entity';
import { Source } from '../sources/source.entity';
import { SystemDevice } from '../system_device/system_device.entity';

@Entity('device')
export class Device {
  @PrimaryGeneratedColumn()
  device_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => Source, (source) => source.devices, { eager: false, nullable: false })
  @JoinColumn({ name: 'sources_id' })
  source: Source;

  @ManyToOne(() => SystemDevice, (systemDevice) => systemDevice.devices, { eager: true })
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

  @OneToMany(() => Schedule, (schedule) => schedule.device)
  schedules: Schedule[];
 
}
