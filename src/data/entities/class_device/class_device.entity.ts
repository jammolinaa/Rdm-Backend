import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('class_device')
export class ClassDevice {
  @PrimaryGeneratedColumn()
  class_device_id: number;

  @Column()
  name: string;
}
