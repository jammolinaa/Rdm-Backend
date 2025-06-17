import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SystemDevice } from '../system_device/system_device.entity';

@Entity('class_device')
export class ClassDevice {
  @PrimaryGeneratedColumn()
  class_device_id: number;

  @Column()
  name: string;

  @OneToMany(() => SystemDevice, (systemdevice) => systemdevice.class_device, { onDelete: 'CASCADE' })
  systemDevices: Array<SystemDevice>; 

}
