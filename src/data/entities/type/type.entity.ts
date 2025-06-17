import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Source } from "../sources/source.entity";
import { SystemDevice } from "../system_device/system_device.entity";

@Entity('type')

export class Type {

    @PrimaryGeneratedColumn()
    type_id: number;

    @Column()
    name: string;
    
    @OneToMany(() => Source, (source) => source.type, { onDelete: 'CASCADE' })
    sources: Array<Source>;

    @OneToMany(() => SystemDevice, (systemdevice) => systemdevice.type, { onDelete: 'CASCADE' })
    systemDevices: SystemDevice[]; 
}
