import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Schedule } from '../schedules/schedule.entity';

@Entity('device')
export class Device {
  @PrimaryGeneratedColumn()
  device_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column()
  sources_id: number;

  @Column()
  system_device_id: number;

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
