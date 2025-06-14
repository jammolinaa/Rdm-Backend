import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Source } from "../sources/source.entity";
@Entity('type')

export class Type {

    @PrimaryGeneratedColumn()
    type_id: number;

    @Column()
    name: string;
    
    @OneToMany(() => Source, (source) => source.type)
    sources: Source[];
      
}
