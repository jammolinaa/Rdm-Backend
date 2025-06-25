import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Type } from '../type/type.entity';
import { Device } from '../devices/device.entity';

@Entity('source')
export class Source {
  @PrimaryGeneratedColumn()
  sources_id: number;

  @ManyToOne(() => Type, (type) => type.sources, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @OneToMany(() => Device, (device) => device.source, { onDelete: 'CASCADE' })
  devices: Array<Device>;
}
