import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SystemDevice } from '../system_device/system_device.entity';

@Entity('system')
export class System {
  @PrimaryGeneratedColumn()
  system_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => SystemDevice, (systemdevice) => systemdevice.system, { onDelete: 'CASCADE' })
  systemDevices: SystemDevice[];
}
