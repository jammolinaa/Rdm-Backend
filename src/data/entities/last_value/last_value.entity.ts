import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Device } from "../devices/device.entity";

@Entity('last_value')
export class LastValue {

    @PrimaryGeneratedColumn()
    last_value_id: number;

    @ManyToOne(() => Device, (device) => device.lastValue, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'device_id' })
    device: Device;

    @Column()
    system_variable: string;

    @Column()
    value: number;
    
}
