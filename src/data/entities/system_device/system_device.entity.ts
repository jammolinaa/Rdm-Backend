import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToMany } from 'typeorm';
import { System } from 'src/data/entities/system/system.entity';
import { ClassDevice } from 'src/data/entities/class_device/class_device.entity';
import { Type } from 'src/data/entities/type/type.entity';
import { Device } from '../devices/device.entity';

@Entity('system_device')
export class SystemDevice {
  @PrimaryGeneratedColumn()
  system_device_id: number;

  @ManyToOne(() => ClassDevice, { eager: true })
  @JoinColumn({ name: 'class_device_id' })
  class_device: ClassDevice;

  @ManyToOne(() => Type, { eager: true })
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @ManyToOne(() => System, { eager: true })
  @JoinColumn({ name: 'system_id' })
  system: System;

  @Column({ type: 'json' })
  propierty: Record<string, any>;
  
  @OneToMany(() => Device, (device) => device.systemDevice)
  devices: Device[];

} 
