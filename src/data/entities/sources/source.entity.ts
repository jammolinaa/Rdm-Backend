import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Type } from "../type/type.entity";

@Entity('source')
export class Source {

    @PrimaryColumn({unique:true})
    sources_id: number;

    @ManyToOne(() => Type, (type) => type.sources, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'type_id' })
    type_id: Type;

}
