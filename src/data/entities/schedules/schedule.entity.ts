import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { Device } from '../devices/device.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  schedules_id: number;

  @ManyToOne(() => Device, (device) => device.schedules, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'device_id' })
  device: Device;
  
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'json' })
  days: Record<string, any>;

  @Column({ type: 'json' })
  value: Record<string, any>;

  @Column({ type: 'boolean', default: true })
  state: boolean;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
